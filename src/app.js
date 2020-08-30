const express = require('express');
const db = require('./infrastructure/orm/mongoose');
const loaders = require('./loaders');

let app = express();
(async () => {
  await loaders({ expressApp: app });
})();
module.exports = app;
