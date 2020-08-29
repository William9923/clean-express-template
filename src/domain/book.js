'use strict';

module.exports = class {

    constructor(id = null, title, summary, isbn, genres) {
        this.id = id;
        this.title = title;
        this.summary = summary;
        this.isbn = isbn;
        this.genres = genres;
    }

};