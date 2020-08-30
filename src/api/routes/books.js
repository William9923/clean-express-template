var express = require('express');
var router = express.Router();
var { BookController } = require('../controllers/BookController');

/* GET home page. */
router.get('/', async (req, res, next) => await new BookController().getAll(req, res, next));

router.get('/:id',  async (req, res, next) => await new BookController().get(req, res, next));

// router.post('/', new BookController().post);

// router.patch('/:bookId', new BookController().update);

// router.delete('/:bookId', new BookController().delete);

module.exports = router;
