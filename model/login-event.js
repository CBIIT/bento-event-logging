const {SingleUserEvent} = require("./single-user-event");
const {LOGIN} = require("../const/event-types");

const LoginEvent = class extends SingleUserEvent{
    constructor(userID, userEmail, userIDP){
        super(userID, userEmail, userIDP);
        this.event_type = LOGIN
    };

}

module.exports = {
    LoginEvent
}