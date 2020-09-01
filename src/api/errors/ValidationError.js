const { ProcessError } = require('./ProcessError');

class ValidationError extends ProcessError {
    constructor(message, errors) {
        super({message: message, status_code: 400});
        this.name = "ValidationError";
        this.errors = errors;
    }

    jsonify() {
        return {
            message: this.message,
            errors: this.errors
        }
    }
}

exports.ValidationError = ValidationError;