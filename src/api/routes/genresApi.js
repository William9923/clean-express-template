const express = require('express');
const router = express.Router();
const { GenreApiController } = require('../controllers/GenreApiController');
const { GenreValidation } = require('../validation/GenreValidation');

const controller = new GenreApiController();
const validation = new GenreValidation();


/* GET home page. */
router.get('/', async (req, res, next) => {
    try {
        await controller.getAll(req, res, next)
    } catch (err) {
        next(err);
    }
});

router.get('/:id', async (req, res, next) => await controller.get(req, res, next));

router.post('/',
    [
        validation.requireName(),
        validation.sanitizeBody()
    ],
    async (req, res, next) => {
        try {
            await controller.post(req, res, next);
        } catch (err) {
            next(err);
        }
    }
);

router.put('/',
    [
        validation.requireId(),
        validation.requireValidId(),
        validation.requireName(),
        validation.sanitizeBody()
    ],
    async (req, res, next) => {
        try {
            await controller.update(req, res, next);
        } catch (err) {
            next(err);
        }
    })

router.delete('/',
    [
        validation.requireId(),
        validation.requireValidId(),
        validation.sanitizeBody()
    ],
    async (req, res, next) => {
        try {
            await controller.delete(req, res, next);
        } catch (err) {
            next(err);
        }
    }
);

module.exports = router;
