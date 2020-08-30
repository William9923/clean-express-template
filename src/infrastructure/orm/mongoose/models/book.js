const Book = require('../../../../domain/book');

//Require Mongoose
var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var BookSchema = new Schema({
    title: { type: String, required: true },
    summary: { type: String, required: true },
    isbn: { type: String, required: true },
    genres: [{ type: Schema.Types.ObjectId, ref: 'Genre' }]
});

// Virtual for book's URL
BookSchema
    .virtual('url')
    .get(function () {
        return '/books/' + this._id;
    });

BookSchema.loadClass(Book);

module.exports = mongoose.model('Book', BookSchema);