const Book = require('../../orm/mongoose/models/book');
const MongooseRepository = require('./MongooseRepository');

class BookRepository extends MongooseRepository {
    constructor() {
        super({ Model: Book });
    }
}

module.exports = BookRepository;