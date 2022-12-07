const {v4} = require('uuid')

const BentoEvent = class {
    constructor() {
        this.event_id = v4();
        this.timestamp = Date.now();
    }
};

module.exports = {
    BentoEvent
};