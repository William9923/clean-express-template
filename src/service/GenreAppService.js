const AppService = require('./AppService');
const GenreRepository = require('../infrastructure/repositories/moongose/GenreRepository');

class GenreAppServices extends AppService {
    constructor() {
        super({ Repository: new GenreRepository() });
    }
}

module.exports = GenreAppServices;