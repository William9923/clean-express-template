const expressLoader = require('./express');
const viewLoader = require('./view');
const handlerLoader = require('./handler');
const dbLoader = require('./database');
const config = require('../config');

// object as parameter so that it pass by reference
module.exports = async ({ expressApp }) => {
    await expressLoader({ app: expressApp });
    config.logger.info("Express Initialized");

    await viewLoader({ app: expressApp });
    config.logger.info("View Template and Engine Initialized");

    await handlerLoader({ app: expressApp });
    config.logger.info("Handler Routing Initialized");
}