const success = (status, message, data) => {
    return {
        status,
        message,
        data,
    };
};

module.exports = {
    success,
};
