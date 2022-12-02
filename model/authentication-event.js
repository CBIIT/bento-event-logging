const {BentoEvent} = require("./bento-event");

const AuthenticationEvent = class extends BentoEvent{
    constructor(userID, userEmail, userIDP) {
        super();
        this.user_id = userID;
        this.user_email = userEmail;
        this.user_idp = userIDP;
    }
}

module.exports = {
    AuthenticationEvent
}