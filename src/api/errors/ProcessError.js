class ProcessError extends Error {
    constructor({message, status_code=500}) {
        super(message);
        this.status = status_code;
        this.name = "ProcessError";
    }

    jsonify() {
        return {
            error: this.message,
            status: this.status,
        }
    }
}

exports.ProcessError = ProcessError;