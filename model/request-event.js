const {REQUEST} = require("../const/event-types");
const {BentoEvent} = require("./bento-event");

const RequestEvent = class extends BentoEvent{
    constructor(armID, armName, requesterID, requesterEmail, requesterIDP) {
        super();
        this.event_type = REQUEST;
        this.arm_id = armID;
        this.arm_name = armName;
        this.requester_id = requesterID;
        this.requester_email = requesterEmail;
        this.requester_idp = requesterIDP;
    }
}

module.exports = {
    RequestEvent
}