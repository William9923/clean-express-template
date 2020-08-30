const BookAppServices = require('../../service/BookAppService');
const book = require('../../infrastructure/orm/mongoose/models/book');

class BookController {

    async getAll(req, res, next) {
        let data = await new BookAppServices().getAll({}, { populate: 'genres' });
        return res.render("booklists", {
            title: "Book",
            items: data
        });
    }

    async get(req, res, next) {
        let data = await new BookAppServices().get({_id: req.params.id}, { populate: 'genres'});
        return res.render("booksingle", {book: data});
    }
}

exports.BookController = BookController;