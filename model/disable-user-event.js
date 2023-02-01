const {SingleUserEvent} = require("./single-user-event");
const {DISABLE} = require("../const/event-types");

const DisableUserEvent = class extends SingleUserEvent{
    constructor(userID, userEmail, userIDP) {
        super(userID, userEmail, userIDP);
        this.event_type = DISABLE
    };
}

module.exports = {
    DisableUserEvent
}