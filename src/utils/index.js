let instance = null

class Utility {

    constructor() {
     this.name = "Utility Singleton";
    }

    static getInstance() {
     if(!instance) {
         instance = new Utility();
     }

     return instance;
    }
}

module.exports = Utility