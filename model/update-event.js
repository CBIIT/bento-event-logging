const {BentoEvent} = require("./bento-event");
const {UPDATE} = require("../const/event-types");

const UpdateEvent = class extends BentoEvent{
    constructor(updatedField, oldValue, newValue, actingUserID, actingUserEmail, actingUserIDP,
                updatedUserID, updatedUserEmail, updatedUserIDP) {
        super();
        this.event_type = UPDATE;
        this.updated_field = updatedField;
        this.old_value = oldValue;
        this.new_value = newValue;
        this.acting_user_id = actingUserID;
        this.acting_user_email = actingUserEmail;
        this.acting_user_idp = actingUserIDP;
        this.updated_user_id = updatedUserID;
        this.updated_user_email = updatedUserEmail;
        this.updated_user_idp = updatedUserIDP;
    }
}

module.exports = {
    UpdateEvent
}