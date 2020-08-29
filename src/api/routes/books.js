var express = require('express');
var router = express.Router();
var controller = require('../controllers/bookController');

/* GET home page. */
router.get('/', controller.getAll);

router.get('/:bookId', controller.get);

router.post('/', controller.post);

router.patch('/:bookId', controller.patch);

router.delete('/:bookId', controller.delete);

module.exports = router;
