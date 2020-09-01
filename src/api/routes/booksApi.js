var express = require('express');
var router = express.Router();

var { BookApiController } = require('../controllers/BookApiController');

/* GET home page. */
router.get('/', async (req, res, next) => await new BookApiController().getAll(req, res, next));

router.get('/:id', async (req, res, next) => await new BookApiController().get(req, res, next));

module.exports = router;
