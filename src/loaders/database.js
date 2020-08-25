const mongoose = require('mongoose');
const config = require('../config');

module.exports = async () => {
    const connection = await mongoose.connect(config.databaseURL, { useNewUrlParser: true, useUnifiedTopology: true });
    //Get the default connection
    let db = mongoose.connection;
    //Bind connection to error event (to get notification of connection errors)
    db.on('error', config.logger.error(console, 'MongoDB connection error:'));
    return connection.connection.db;
}