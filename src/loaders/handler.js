const createError = require('http-errors');
const config = require('../config');
const logger = require('../infrastructure/logger');
const indexRouter = require('../api/routes/index');
const booksRouter = require('../api/routes/books');
const genresRouter = require('../api/routes/genres');
const booksApiRouter = require('../api/routes/booksApi');
const genresApiRouter = require('../api/routes/genresApi');
const { ProcessError } = require('../api/errors/ProcessError');

module.exports = async ({ app }) => {
    app.use('/', indexRouter);
    app.use('/books', booksRouter);
    app.use('/genres', genresRouter);

    //api gateway 
    app.use(config.api.prefix + '/books', booksApiRouter);
    app.use(config.api.prefix + '/genres', genresApiRouter);

    // 404
    app.use(function (req, res, next) {
        next(createError(404));
    });

    // error handler
    app.use(function (err, req, res, next) {
        // set locals, only providing error in development
        res.locals.message = err.message;
        res.locals.error = req.app.get('env') === 'development' ? err : {};

        logger.error("Server Error! Please check the application !");

        res.status(err.status || 500);
        
        if (err instanceof ProcessError) {
            res.json(err.jsonify());
        }

        // render the error page
        res.render('error');
    });
}