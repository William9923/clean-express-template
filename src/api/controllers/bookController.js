const books__GET = function (req, res) {
    res.send("List View of Book Web Page Template");
};

const book__GET = function (req, res) {
    res.send("Single Book Web Page Template");
}

const book__POST = function(req, res) {
    res.send("Creation router");
}

const book__DELETE = function(req, res) {
    res.send("Deletion router");
}

const book__PATCH = function(req, res) {
    res.send("Patching router");
}

module.exports = {
    "get" : book__GET,
    "getAll" : books__GET,
    "post" : book__POST,
    "patch" : book__PATCH,
    "delete" : book__DELETE
}

