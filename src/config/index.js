const dotenv = require('dotenv');

const logger = require('./logger');
const dir = require('./directory');

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// finding the .env file / env configuration
const envFound = dotenv.config();
if (envFound.error) {
    throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

module.exports = {
    dir: dir,
    logger: logger,
    port: process.env.PORT,
    databaseURL: process.env.DATABASE_URL,
    logs: {
        level: process.env.LOG_LEVEL || 'debug',
    },
    api: {
        prefix: process.env.API_PREFIX || '/api'
    }
}