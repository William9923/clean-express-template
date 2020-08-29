#! /usr/bin/env node
module.exports = async () => {
    const config = require('../config');
    console.log('This script populates some test books, authors, genres and bookinstances to your database. Specified database as argument - e.g.: populatedb mongodb+srv://cooluser:coolpassword@cluster0-mbdj7.mongodb.net/local_library?retryWrites=true');

    var async = require('async')
    var Book = require('../infrastructure/orm/mongoose/models/book');
    var Genre = require('../infrastructure/orm/mongoose/models/genre');

    var mongoose = require('mongoose');
    var mongoDB = config.databaseURL;
    mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
    mongoose.Promise = global.Promise;
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'MongoDB connection error:'));

    var genres = [];
    var books = [];

    function genreCreate(name, cb) {
        var genre = new Genre({ name: name });

        genre.save(function (err) {
            if (err) {
                cb(err, null);
                return;
            }
            console.log('New Genre: ' + genre);
            genres.push(genre)
            cb(null, genre);
        });
    }

    function bookCreate(title, summary, isbn, genre, cb) {
        bookdetail = {
            title: title,
            summary: summary,
            isbn: isbn
        }
        if (genre != false) bookdetail.genre = genre

        var book = new Book(bookdetail);
        book.save(function (err) {
            if (err) {
                cb(err, null)
                return
            }
            console.log('New Book: ' + book);
            books.push(book)
            cb(null, book)
        });
    }

    function createGenreAuthors(cb) {
        async.series([
            function (callback) {
                genreCreate("Fantasy", callback);
            },
            function (callback) {
                genreCreate("Science Fiction", callback);
            },
            function (callback) {
                genreCreate("French Poetry", callback);
            },
        ],
            // optional callback
            cb);
    }


    function createBooks(cb) {
        async.parallel([
            function (callback) {
                bookCreate('The Name of the Wind (The Kingkiller Chronicle, #1)', 'I have stolen princesses back from sleeping barrow kings. I burned down the town of Trebon. I have spent the night with Felurian and left with both my sanity and my life. I was expelled from the University at a younger age than most people are allowed in. I tread paths by moonlight that others fear to speak of during day. I have talked to Gods, loved women, and written songs that make the minstrels weep.', '9781473211896', [genres[0],], callback);
            },
            function (callback) {
                bookCreate("The Wise Man's Fear (The Kingkiller Chronicle, #2)", 'Picking up the tale of Kvothe Kingkiller once again, we follow him into exile, into political intrigue, courtship, adventure, love and magic... and further along the path that has turned Kvothe, the mightiest magician of his age, a legend in his own time, into Kote, the unassuming pub landlord.', '9788401352836', [genres[0],], callback);
            },
            function (callback) {
                bookCreate("The Slow Regard of Silent Things (Kingkiller Chronicle)", 'Deep below the University, there is a dark place. Few people know of it: a broken web of ancient passageways and abandoned rooms. A young woman lives there, tucked among the sprawling tunnels of the Underthing, snug in the heart of this forgotten place.', '9780756411336', [genres[0],], callback);
            },
            function (callback) {
                bookCreate("Apes and Angels", "Humankind headed out to the stars not for conquest, nor exploration, nor even for curiosity. Humans went to the stars in a desperate crusade to save intelligent life wherever they found it. A wave of death is spreading through the Milky Way galaxy, an expanding sphere of lethal gamma ...", '9780765379528', [genres[1],], callback);
            },
            function (callback) {
                bookCreate("Death Wave", "In Ben Bova's previous novel New Earth, Jordan Kell led the first human mission beyond the solar system. They discovered the ruins of an ancient alien civilization. But one alien AI survived, and it revealed to Jordan Kell that an explosion in the black hole at the heart of the Milky Way galaxy has created a wave of deadly radiation, expanding out from the core toward Earth. Unless the human race acts to save itself, all life on Earth will be wiped out...", '9780765379504', [genres[1],], callback);
            },
            function (callback) {
                bookCreate('Test Book 1', 'Summary of test book 1', 'ISBN111111', [genres[0], genres[1]], callback);
            },
            function (callback) {
                bookCreate('Test Book 2', 'Summary of test book 2', 'ISBN222222', false, callback)
            }
        ],
            // optional callback
            cb);
    }


    async.series([
        createGenreAuthors,
        createBooks,
    ],
        // Optional callback
        function (err, results) {
            if (err) {
                console.log('FINAL ERR: ' + err);
            } else {
                console.log("Enterring data this row successful");
            }
            // All done, disconnect from database
            mongoose.connection.close();
        });
}






