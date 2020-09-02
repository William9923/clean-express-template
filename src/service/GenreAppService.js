const AppService = require('./AppService');
const GenreRepository = require('../infrastructure/repositories/moongose/GenreRepository');
const BookAppServices = require('./BookAppService');
const { ProcessError } = require('../api/errors/ProcessError');
const { DbError } = require('../api/errors/DbError');
const Genre = require('../infrastructure/orm/mongoose/models/genre');

class GenreAppServices extends AppService {
    constructor() {
        super({ Repository: new GenreRepository() });
    }

    async getGenreAndBookById(id) {
        let genre, books;

        const callback = function (err, results) {
            if (err) {
                throw new ProcessError({ message: "Error when retrieving data", status_code: 500 })
            }
            if (results.genre == null) { // No results.
                throw new DbError({ model: "Genre", problem: `accessing genre data with id ${id}.` })
            }
            return results;
        }

        try {
            [genre, books] = await Promise.all([this.get({ _id: id }, { populate: null, sort: null }), new BookAppServices().getAll({ 'genres': id }, { populate: null, sort: null })]);
        } catch (err) {
            callback(err, null);
        }

        return callback(null, {
            genre: genre,
            books: books
        });

    }

    async createNewGenre(name) {
        let data = await this.get({ name: name }, { populate: null, sort: null });
        if (data) {
            throw new ProcessError({ message: "Data with same name existed!" });
        }

        try {
            await new GenreAppServices().create({
                name: name
            });
        } catch (err) {
            throw new DbError({ model: "Genre", problem: "adding new genre" });
        }
    }

    async updateById(id, name) {
        let genre = await this.get({ _id: id }, { populate: null, sort: null });
        if (!genre) {
            throw new ProcessError({ message: "Data not exist!" });
        }

        try {
            let newGenre = new Genre({
                name: name,
                _id: id
            });
            await this.update(genre, newGenre);
        } catch (err) {
            throw new DbError({ model: "Genre", problem: "updating new genre" })
        }
    }

    async deleteById(id) {
        let [genre, books] = await Promise.all([this.get({ _id: id }, { populate: null, sort: null }), new BookAppServices().getAll({ 'genres': id }, { populate: null, sort: null })]);
        if (!genre) {
            throw new ProcessError({ message: "Data not exist!" });
        }

        if (!(books === undefined || books.length == 0)) {
            // array empty or does not exist
            throw new ProcessError({ message: "Genre is used by other books!" });
        }

        try {
            await new GenreAppServices().delete(genre);
        } catch (err) {
            throw new DbError({ model: "Genre", problem: "deleting existing genre" });
        }
    }
}

module.exports = GenreAppServices;