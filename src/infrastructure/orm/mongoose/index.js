'use strict';
const mongoose = require('mongoose');
const config = require('../../../config');
const logger = require('../../logger');

(async () => {
  await mongoose.connect(config.databaseURL, { useNewUrlParser: true, useUnifiedTopology: true });
})();
//Get the default connection
const db = mongoose.connection;
//Bind connection to error event (to get notification of connection errors)
mongoose.connection.on("error", err => {
  logger.error(console, 'MongoDB connection error:')
})
mongoose.connection.on("connected", (err, res) => {
  logger.info('connected to MongoDB database!')
})
module.exports = mongoose;