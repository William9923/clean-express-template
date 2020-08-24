const createError = require('http-errors');
const config = require('../config');
const indexRouter = require('../api/routes/index');
const usersRouter = require('../api/routes/quotes');

module.exports = async ({app}) => {
    app.use(config.api.prefix, indexRouter);
    app.use(config.api.prefix + '/users', usersRouter);

    app.use(function(req, res, next) {
        config.logger.warn("No Page Found!");    
        next(createError(404));
    });
    
    // error handler
    app.use(function(err, req, res, next) {
        // set locals, only providing error in development
        res.locals.message = err.message;
        res.locals.error = req.app.get('env') === 'development' ? err : {};

        config.logger.error("Server Error! Please check the application :<");
        
        // render the error page
        res.status(err.status || 500);
        res.render('error');
    });
}