/* Act as an interface / contract for other repository  */
class Repository {
    async count() {
        throw new Error("NOT IMPLEMENTED");
    }

    async find() {
        throw new Error("NOT IMPLEMENTED");
    }

    async create() {
        throw new Error("NOT IMPLEMENTED");
    }

    async update() {
        throw new Error("NOT IMPLEMENTED");
    }

    async delete() {
        throw new Error("NOT IMPLEMENTED");
    }
}

module.exports = Repository;