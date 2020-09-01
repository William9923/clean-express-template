class AppService {
    constructor({ Repository }) {
        this.repository = Repository;
    }

    async getAll(query, { populate = null, columns = null, sort = null }) {
        return await this.repository.find(query, { populate: populate, columns: columns });
    }

    async get(query, { populate = null, columns = null, sort = null }) {
        return await this.repository.find(query, { multiple: false, populate: populate, columns: columns });
    }

    async count(query) {
        return await this.repository.find(query, { count: true });
    }

    async create(data) {
        return await this.repository.create(data);
    }

    async delete(data) {
        console.log("debug app service");
        return await this.repository.remove(data);
    }
}

module.exports = AppService;