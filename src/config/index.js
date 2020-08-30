const dotenv = require('dotenv');

const dir = require('./directory');

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// finding the .env file / env configuration
const envFound = dotenv.config();
if (envFound.error) {
    throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

let databaseURL = "";

switch(process.env.USE_DB) {
    case "mongo" :
        databaseURL = process.env.MONGO_URL;
        break;
    case "postgres" :
        databaseURL = process.env.POSTGRES_URL;
        break;
}

module.exports = {
    dir: dir,
    port: process.env.PORT,
    databaseURL: databaseURL,
    use: process.env.USE_DB,
    logs: {
        level: process.env.LOG_LEVEL || 'debug',
    },
    api: {
        prefix: process.env.API_PREFIX || '/api'
    }
}