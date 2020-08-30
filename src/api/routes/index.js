var express = require('express');
var router = express.Router();
const {IndexController} = require('../controllers/IndexController');

/* GET home page. */
router.get('/', async (req, res, next) => await new IndexController().getAll(req, res, next));

module.exports = router;
