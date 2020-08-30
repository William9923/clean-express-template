const GenreAppServices = require('../../service/GenreAppService');
const BookAppServices = require('../../service/BookAppService');

class IndexController {
    async getAll(req, res, next) {
        let response = {
            title: "Local Library Home"
        }

        try {
            let counter = await Promise.all([new BookAppServices().count({}), new GenreAppServices().count({})]);
            response['data'] = {
                book_count: counter[0],
                genre_count: counter[1]
            }

        } catch (err) {
            response['error'] = err
        }

        return res.render('index', response);
    }
}

exports.IndexController = IndexController;
