const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Defining schema for the Book Model
let BookSchema = new Schema({
    title: {type: String, required: true},
    summary: {type: String, required: true},
    isbn: {type: String, required: true},
    genre: [{type: Schema.Types.ObjectId, ref: 'Genre'}]
})

// Creating virtual properties of the path
BookSchema
    .virtual('path')
    .get(() => {
        return '/catalog/book/' + this._id;
    });

// Exporting model 
module.exports = mongoose.model()

