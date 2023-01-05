const {SingleUserEvent} = require("./single-user-event");
const {SESSION_TIMEOUT} = require("../const/event-types");

const SessionTimeoutEvent = class extends SingleUserEvent{
    constructor(userID, userEmail, userIDP){
        super(userID, userEmail, userIDP);
        this.event_type = SESSION_TIMEOUT;
    };
}

module.exports = {
    SessionTimeoutEvent
}