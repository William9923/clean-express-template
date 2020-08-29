module.exports = async () => {
    const config = require('../config');
    console.log('This script populates some test books, authors, genres and bookinstances to your database. Specified database as argument - e.g.: populatedb mongodb+srv://cooluser:coolpassword@cluster0-mbdj7.mongodb.net/local_library?retryWrites=true');

    var async = require('async')

    const { Sequelize, DataTypes } = require('sequelize');
    const BookSchema = require('../infrastructure/orm/sequelize/models/book');
    const GenreSchema = require('../infrastructure/orm/sequelize/models/genre');
    const BookGenreSchema = require('../infrastructure/orm/sequelize/relation/bookgenre');

    const sequelize = new Sequelize(config.databaseURL);

    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }

    let Book = await BookSchema(sequelize, DataTypes);
    let Genre = await GenreSchema(sequelize, DataTypes);
    let BookGenre = await BookGenreSchema(sequelize, DataTypes);

    // defining association
    Book.belongsToMany(Genre, { through: BookGenre });
    Genre.belongsToMany(Book, { through: BookGenre });

    Book.hasMany(BookGenre);
    BookGenre.belongsTo(Book);
    Genre.hasMany(BookGenre);
    BookGenre.belongsTo(Genre);

    // if any then drop table
    await Book.sync({ force: true });
    await Genre.sync({ force: true });
    await BookGenre.sync({ force: true });

    var genres = [];
    var books = [];

    async function genreCreate(name, cb) {
        try {
            let genre = await Genre.create({ name: name });
            console.log('New Genre: ' + genre);
            cb(null, genre);
            genres.push(genre);
        } catch (err) {
            cb(err, null);
            return;
        }
    }

    async function bookCreate(title, summary, isbn, genre, cb) {
        let bookdetail = {
            title: title,
            summary: summary,
            isbn: isbn
        }
        try {
            let book = await Book.create(bookdetail);
            console.log('New Book: ' + book);
            cb(null, book);
            books.push(book);
            if (genre != false) {
                genre.forEach(async g => {
                    let book_genre = await BookGenre.create({
                        BookBookId: book.book_id, // need to learn how to replace this naming convention
                        GenreGenreId: g.genre_id,
                        selfGranted: false
                    });
                    console.log('New Book-Genre: ' + book_genre);
                });
            }

        } catch (err) {
            console.log(err);
            cb(err, null);
            return;
        }
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
        async function (err, results) {
            if (err) {
                console.log('FINAL ERR: ' + err);
            } else {
                console.log("Enterring data this row successful");
            }
            // All done, disconnect from database
            await sequelize.close();
        });
}