const validator = require('express-validator');

class GenreValidation {
    requireId() {
        return validator.body('id', "Id required").trim().isLength({min:1});
    }

    requireValidId() {
        return validator.body('id', 'Id is not valid').trim().isMongoId();
    }

    requireName() {
        return validator.body('name', 'Genre name required').trim().isLength({ min: 1 });
    }

    sanitizeBody() {
        return validator.sanitizeBody('name').escape();
    }
}

exports.GenreValidation = GenreValidation