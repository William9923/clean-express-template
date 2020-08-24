const express = require('express');
const loaders = require('./loaders');

let app = express();
(async () => {
  await loaders({ expressApp: app });
})();
module.exports = app;
