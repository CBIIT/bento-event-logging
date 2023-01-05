const {RequestEvent} = require("./request-event");
const {REVIEW} = require("../const/event-types");

const ReviewEvent = class extends RequestEvent{
    constructor(armID, armName, requesterID, requesterEmail, requesterIDP,
                newStatus, oldStatus, reviewerID, reviewerEmail, reviewerIDP) {
        super(armID, armName, requesterID, requesterEmail, requesterIDP);
        this.event_type = REVIEW;
        this.new_status = newStatus;
        this.old_status = oldStatus;
        this.reviewer_id = reviewerID;
        this.reviewer_email = reviewerEmail;
        this.reviewer_idp = reviewerIDP;
    }
}

module.exports = {
    ReviewEvent
}