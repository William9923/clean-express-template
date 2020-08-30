const AppService = require('./AppService');
const BookRepository = require('../infrastructure/repositories/moongose/BookRepository');

class BookAppServices extends AppService {
    constructor() {
        super({ Repository: new BookRepository() });
    }
}

module.exports = BookAppServices;