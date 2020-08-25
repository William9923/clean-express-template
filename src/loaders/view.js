const path = require('path');
const express = require('express');
const config = require('../config');

module.exports = async ({ app }) => {
    // view engine setup
    app.set('views', path.join(config.dir, 'views'));
    // setup view engine
    app.set('view engine', 'pug');

    let public = express.static(path.join(config.dir, '../', 'public'))
    app.use(public); // public site setup
    app.use('/static', public);
    return app;
}