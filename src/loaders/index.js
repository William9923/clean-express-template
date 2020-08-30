const expressLoader = require('./express');
const viewLoader = require('./view');
const handlerLoader = require('./handler');
const logger = require('../infrastructure/logger');
const mongooseLoader = require('../infrastructure/orm/mongoose');

// object as parameter so that it pass by reference
module.exports = async ({ expressApp }) => {
    await expressLoader({ app: expressApp });
    logger.info("Express Initialized");

    await viewLoader({ app: expressApp });
    logger.info("View Template and Engine Initialized");

    await handlerLoader({ app: expressApp });
    logger.info("Handler Routing Initialized");
}