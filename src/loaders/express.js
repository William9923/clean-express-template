const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const bodyParser = require('body-parser');
const middlewares = require('../api/middlewares');
const config = require('../config');

module.exports = async ({ app }) => {
    // status 
    app.get(config.api.prefix + '/status', (req, res) => {
        res.json({
            "status": "On"
        });
    })
    // cors setup
    app.use(cors());
    // logging setup
    app.use(middlewares.loggingMiddleware);
    // body parser
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    // cookie parser
    app.use(cookieParser());

    return app;
}