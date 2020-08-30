const Genre = require('../../orm/mongoose/models/genre');
const MongooseRepository = require('./MongooseRepository');

class GenreRepository extends MongooseRepository {
    constructor() {
        super({ Model: Genre });
    }
}

module.exports = GenreRepository;