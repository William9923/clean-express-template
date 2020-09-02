const validator = require('express-validator');
const GenreAppServices = require('../../service/GenreAppService');
const { ValidationError } = require('../errors/ValidationError');

class GenreApiController {
    async get(req, res, next) {
        let result = await new GenreAppServices().getGenreAndBookById(req.params.id);
        return res.json(result);
    }

    async getAll(req, res, next) {
        let data = await new GenreAppServices().getAll({}, { populate: null, sort: null });
        return res.json(data);
    }

    async post(req, res, next) {

        const errors = validator.validationResult(req);
        let err = this.validate(errors);
        if (err) {
            throw err;
        }

        await new GenreAppServices().createNewGenre(req.body.name);
        return res.status(201).send();
    }

    async update(req, res, next) {
        const errors = validator.validationResult(req);
        let err = this.validate(errors);
        if (err) {
            throw err;
        }

        await new GenreAppServices().updateById(req.body.id, req.body.name);
        return res.status(204).send();
    }

    async delete(req, res, next) {
        const errors = validator.validationResult(req);
        let err = this.validate(errors);
        if (err) {
            throw err;
        }

        await new GenreAppServices().deleteById(req.body.id);
        return res.status(204).send();
    }

    validate(errors) {
        if (!errors.isEmpty()) {
            return new ValidationError("Error happened when validating body!", errors.array());
        }
    }
}

exports.GenreApiController = GenreApiController;

