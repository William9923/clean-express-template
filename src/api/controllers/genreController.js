const GenreAppServices = require('../../service/GenreAppService');
const BookAppServices = require('../../service/BookAppService');

class GenreController {
    async get(req, res, next) {
        let genre, books;

        const callback = function (err, results) {
            if (err) { return next(err); }
            if (results.genre == null) { // No results.
                var err = new Error('Genre not found');
                err.status = 404;
                return next(err);

            }
            res.render('genresingle', { title: 'Genre Detail', genre: results.genre, books: results.books });
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
        return res.render("genrelists", {
            title: "Genre",
            items: data
        });
    }
}

exports.GenreController = GenreController;

