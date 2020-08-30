const createError = require('http-errors');
const config = require('../config');
const logger = require('../infrastructure/logger');
const indexRouter = require('../api/routes/index');
const booksRouter = require('../api/routes/books');
const genresRouter = require('../api/routes/genres');

module.exports = async ({ app }) => {
    app.use('/', indexRouter);
    app.use('/books', booksRouter);
    app.use('/genres', genresRouter);

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

        // render the error page
        res.status(err.status || 500);
        res.render('error');
    });
}