const validator = require('express-validator');

const GenreAppServices = require('../../service/GenreAppService');
const BookAppServices = require('../../service/BookAppService');

const { ValidationError } = require('../errors/ValidationError');
const { DbError } = require('../errors/DbError');
const { ProcessError } = require('../errors/ProcessError');

class GenreApiController {
    async get(req, res, next) {
        let genre, books;

        const callback = function (err, results) {
            if (err) { return next(err); }
            if (results.genre == null) { // No results.
                throw new DbError({ model: "Genre", problem: `accessing genre data with id ${req.params.id}.` })
            }
            return res.json(results);
        }

        try {
            [genre, books] = await Promise.all([new GenreAppServices().get({ _id: req.params.id }, { populate: null, sort: null }), new BookAppServices().getAll({ 'genres': req.params.id }, { populate: null, sort: null })]);
        } catch (err) {
            callback(err, null);
        }

        callback(null, {
            genre: genre,
            books: books
        });
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

        let data = await new GenreAppServices().get({ name: req.body.name }, { populate: null, sort: null });
        if (data) {
            throw new ProcessError({ message: "Data with same name existed!" });
        }

        try {
            await new GenreAppServices().create({
                name: req.body.name
            });
            return res.status(201).send();

        } catch (err) {
            throw new DbError({ model: "Genre", problem: "adding new genre" });
        }
    }

    async delete(req, res, next) {
        const errors = validator.validationResult(req);
        let err = this.validate(errors);
        if (err) {
            throw err;
        }

        let [genre, books] = await Promise.all([new GenreAppServices().get({ _id: req.body.id }, { populate: null, sort: null }), new BookAppServices().getAll({ 'genres': req.body.id }, { populate: null, sort: null })]);
        if (!genre) {
            throw new ProcessError({ message: "Data not exist!" });
        }

        if (!(books === undefined || books.length == 0)) {
            // array empty or does not exist
            throw new ProcessError({ message: "Genre is used by other books!" });
        }

        try {
            await new GenreAppServices().delete(genre);
            return res.status(204).send();
        } catch (err) {
            throw new DbError({ model: "Genre", problem: "deleting existing genre" });
        }
    }

    validate(errors) {
        if (!errors.isEmpty()) {
            return new ValidationError("Error happened when validating body!", errors.array());
        }
    }
}

exports.GenreApiController = GenreApiController;

