//Require Mongoose
var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var GenreSchema = new Schema({
    name: { type: String, required: true }
});

// Virtual for book's URL
GenreSchema
    .virtual('url')
    .get(function () {
        return '/catalog/genre/' + this._id;
    });

module.exports = mongoose.model('Genre', GenreSchema);