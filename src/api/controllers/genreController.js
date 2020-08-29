const genres__GET = function (req, res) {
    res.send("List View of Genre Web Page Template");
};

const genre__GET = function (req, res) {
    res.send("Single Genre Web Page Template");
}

const genre__POST = function(req, res) {
    res.send("Creation router");
}

const genre__DELETE = function(req, res) {
    res.send("Deletion router");
}

const genre__PATCH = function(req, res) {
    res.send("Patching router");
}

module.exports = {
    "get" : genre__GET,
    "getAll" : genres__GET,
    "post" : genre__POST,
    "patch" : genre__PATCH,
    "delete" : genre__DELETE
}
