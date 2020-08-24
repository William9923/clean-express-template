const config = require('../../config');

const logging = async (req, res, next) => {
    // add anything that need to be logged here as a middleware
    config.logger.info(req.originalUrl);
    next();
}

module.exports = logging;