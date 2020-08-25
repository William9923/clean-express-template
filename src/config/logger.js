const dir = require('./directory');
const option = {
    file: {
        level: 'info',
        filename: `${dir}/../logs/apps.log`,
        handleExceptions: true,
        json: true,
        maxsize: 5242880, // 5MB
        maxFiles: 5,
        colorize: false,
    },
    console: {
        level: 'debug',
        handleExceptions: true,
        json: false,
        colorize: true,
    }
};

const winston = require('winston');
const logger = winston.createLogger({
    transports: [
        new winston.transports.Console(option.console),
        new winston.transports.File(option.file)
    ]
});

module.exports = logger;

