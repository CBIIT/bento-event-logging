const {SingleUserEvent} = require("./single-user-event");
const {REGISTRATION} = require("../const/event-types");

const RegistrationEvent = class extends SingleUserEvent{
    constructor(userID, userEmail, userIDP){
        super(userID, userEmail, userIDP);
        this.event_type = REGISTRATION
    };

}

module.exports = {
    RegistrationEvent
}