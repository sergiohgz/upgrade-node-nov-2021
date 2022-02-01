const logger = (req, res, next) => {
    const date = new Date();
    const url = req.originalUrl;
    const method = req.method;
    console.log(`[${date.toISOString()}] -- ${method} ${url}`);
    return next();
};

module.exports = logger;
