const logger = require('../../infrastructure/logger'); 

const logging = async (req, res, next) => {
    // add anything that need to be logged here as a middleware
    logger.info(req.originalUrl);
    next();
}

module.exports = logging;