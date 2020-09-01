const { ProcessError } = require('./ProcessError');

class DbError extends ProcessError {
    
    constructor({ model, problem=null }) {
        super({message: model + " having problem" + problem? ` while ${problem}`: "", status_code:502});
        this.name = "DbError";
        this.model = model;
    }
}

exports.DbError = DbError;