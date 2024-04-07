const mongoose = require('mongoose');
const app = require('./app');
const config = require('./config/config');
const logger = require('./config/logger');
const initaliseWebSocket = require('./socket/socket');
let server;

mongoose
  .connect(config.mongoose.url, config.mongoose.options)
  .then(() => {
    logger.info('Connected to MongoDB');
    // Starting server after connection is established
    server = app.listen(config.port, () => {
      logger.info(`Listening to port ${config.port}`);
      initaliseWebSocket(server);
    });
  })
  .catch((err) => {
    logger.error('Cannot connect to MongoDB', err);
    process.exit(1);
  });

const exitHandler = () => {
  if (server) {
    server.close(async () => {
      logger.info('Server closed');

      // Closing MongoDB connection
      await mongoose.connection.close();
      logger.info('MongoDB connection closed');

      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  logger.error(error);
  exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
  logger.info('SIGTERM received');
  if (server) {
    server.close();
  }
});

module.exports = app;
