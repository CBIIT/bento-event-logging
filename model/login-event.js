const {AuthenticationEvent} = require("./authentication-event");
const {LOGIN} = require("../const/event-types");

const LoginEvent = class extends AuthenticationEvent{
    constructor(userID, userEmail, userIDP){
        super(userID, userEmail, userIDP);
        this.event_type = LOGIN
    };

}

module.exports = {
    LoginEvent
}