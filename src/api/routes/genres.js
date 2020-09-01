var express = require('express');
var router = express.Router();
var { GenreController } = require('../controllers/GenreController');

/* GET home page. */
router.get('/', async (req, res, next) => await new GenreController().getAll(req, res, next));

router.get('/:id', async (req, res, next) => await new GenreController().get(req, res, next));

module.exports = router;
