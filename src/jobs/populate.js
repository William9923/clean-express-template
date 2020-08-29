const config = require('../config');
const populateMongo = require('./populate_mongo');
const populatePostgres = require('./populate_postgres');

(async () => {
    switch (config.use) {
        case "mongo":
            populateMongo();
            break;
        case "postgres":
            await populatePostgres();
            break;
    }
})();