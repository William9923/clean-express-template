'use strict';

const { Sequelize } = require('sequelize');
const { DataTypes } = require("sequelize");
const BookSchema = require('./models/book');
const GenreSchema = require('./models/genre');
const BookGenreSchema = require('./relation/bookgenre');
const config = require('../../config');

const sequelize = new Sequelize(config.databaseURL);

let Book = BookSchema(sequelize, DataTypes);
let Genre = GenreSchema(sequelize, DataTypes);
let BookGenre = BookGenreSchema(sequelize, DataTypes);

// defining association
Book.belongsToMany(Genre, { through: BookGenre });
Genre.belongsToMany(Book, { through: BookGenre });

Book.hasMany(BookGenre);
BookGenre.belongsTo(Book);
Genre.hasMany(BookGenre);
BookGenre.belongsTo(Genre);

module.exports = sequelize;