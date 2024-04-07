const rateLimit = require('express-rate-limit');

const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 min
    // TODO: change afterwards based on requirements
    max: 2000,
    skipSuccessfulRequests: true,
});

const nocache = (_, resp, next) => {
    resp.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    resp.header('Expires', '-1');
    resp.header('Pragma', 'no-cache');
    next();
};

module.exports = {
    authLimiter,
    nocache,
};
