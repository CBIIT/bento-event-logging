const {v4} = require('uuid')

const BentoEvent = class {
    constructor() {
        this.event_id = v4();
        this.timestamp = Date.now();
    }
    getCreateCommand(){
        const keys = Object.keys(this);
        let cypher = "CREATE (e:Event) ";
        keys.forEach(key => cypher += `SET e.${key} = '${this[key]}' `);
        return cypher;
    }
};

module.exports = {
    BentoEvent
};