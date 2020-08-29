'use strict';
const mongoose = require('mongoose');
const config = require('../../config');

(async () => {
  await mongoose.connect(config.databaseURL, { useNewUrlParser: true, useUnifiedTopology: true });
})();
//Get the default connection
const db = mongoose.connection;
//Bind connection to error event (to get notification of connection errors)
db.on('error', config.logger.error(console, 'MongoDB connection error:'));
db.once('open', () => {
  config.logger.info('connected to MongoDB database!')
});

module.exports = mongoose;