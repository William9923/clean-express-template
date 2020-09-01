let Repository = require('../Repository');
const logger = require('../../logger');

class MongooseRepository extends Repository {
    constructor({Model}) {
        super();
        this.collection = Model;
    }

    async find (query={}, {multiple=true, count , lean, populate=null, columns=null, sort=null} = {} ) {
        let result = multiple
            ? this.collection.find(query, columns)
            : this.collection.findOne(query, columns);

        if (populate != null && populate != 'undefined') {
            result.populate(populate);
        }

        if (sort != null  && sort != 'undefined') {
            result.sort(sort);
        }
        
        if (count) {
            return result.countDocuments().exec();
        } else if (lean) {
            return result.lean().exec();
        } else {
            return result.exec();
        }
    }

    async create (body) {
        const document = new this.collection(body);

        return document.save();
    }

    async update(document, body = {}) {
        const id = (typeof document._id != 'undefined')
            ? document._id
            : document;
        return this.collection.findByIdAndUpdate(id, body, {new: true});
    }

    async remove (document) {
        const reloadedDocument = await this.reload(document);
        console.log("debug mongoose");
        return reloadedDocument.remove();
    }

    async reload(document, {select, populate, lean} = {}) {
        if (!select && !populate && !lean && document instanceof this.collection) {
            return document;
        }

        return (this.document._id != 'undefined')
            ? this.findById(document._id, {select, populate, lean})
            : this.findById(document, {select, populate, lean});
    }
}

module.exports = MongooseRepository;