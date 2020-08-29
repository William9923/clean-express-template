var express = require('express');
var router = express.Router();
var controller = require('../controllers/genreController');

/* GET home page. */
router.get('/', controller.getAll);

router.get('/:genreId', controller.get);

router.post('/', controller.post);

router.patch('/:genreId', controller.patch);

router.delete('/:genreId', controller.delete);

module.exports = router;
