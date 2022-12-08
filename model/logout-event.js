const {SingleUserEvent} = require("./single-user-event");
const {LOGOUT} = require("../const/event-types");

const LogoutEvent = class extends SingleUserEvent{
    constructor(userID, userEmail, userIDP){
        super(userID, userEmail, userIDP);
        this.event_type = LOGOUT
    };

}

module.exports = {
    LogoutEvent
}