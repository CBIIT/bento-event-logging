const {BentoEvent} = require("./bento-event");
const {UPDATE} = require("../const/event-types");

const UpdateEvent = class extends BentoEvent{
    constructor(updatedField, oldValue, newValue, actingUserID, actingUserEmail, actingUserIDP) {
        super();
        this.event_type = UPDATE;
        this.updated_field = updatedField;
        this.old_value = oldValue;
        this.new_value = newValue;
        this.acting_user_id = actingUserID;
        this.acting_user_email = actingUserEmail;
        this.acting_user_idp = actingUserIDP;
    }

    static updateUserEvent(updatedField, oldValue, newValue, actingUserID, actingUserEmail, actingUserIDP,
                           updatedUserID, updatedUserEmail, updatedUserIDP) {
        let event = new UpdateEvent(updatedField, oldValue, newValue, actingUserID, actingUserEmail, actingUserIDP);
        event.updated_user_id = updatedUserID;
        event.updated_user_email = updatedUserEmail;
        event.updated_user_idp = updatedUserIDP;
        return event;
    }

    static updateUserEventByApp(updatedField, oldValue, newValue, actingUserID, actingUserEmail, actingUserIDP) {
        return new UpdateEvent(updatedField, oldValue, newValue, actingUserID, actingUserEmail, actingUserIDP);
    }
}

module.exports = {
    UpdateEvent
}