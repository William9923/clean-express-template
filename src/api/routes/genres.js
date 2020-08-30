var express = require('express');
var router = express.Router();
var { GenreController } = require('../controllers/GenreController');

/* GET home page. */
router.get('/', async (req, res, next) => await new GenreController().getAll(req, res, next));

router.get('/:id',  async (req, res, next) => await new GenreController().get(req, res, next));

// router.post('/', new GenreController().post);

// router.patch('/:genreId', new GenreController().update);

// router.delete('/:genreId', new GenreController().delete);

module.exports = router;
