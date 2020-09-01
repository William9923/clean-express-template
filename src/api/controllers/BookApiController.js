const BookAppServices = require('../../service/BookAppService');

class BookApiController {

    async getAll(req, res, next) {
        let data = await new BookAppServices().getAll({}, { populate: 'genres' });
        return res.json(data);
    }

    async get(req, res, next) {
        let data = await new BookAppServices().get({ _id: req.params.id }, { populate: 'genres' });
        return res.json(data);
    }
}

exports.BookApiController = BookApiController;