const {SingleUserEvent} = require("./single-user-event");
const {TOKEN_INVALIDATED} = require("../const/event-types");

const TokenInvalidatedEvent = class extends SingleUserEvent{
    constructor(user, token) {
        super(user.ID, user.email, user.IDP);
        this.event_type = TOKEN_INVALIDATED;
        this.token_uuid = token.uuid;
    };
}

module.exports = {
    TokenInvalidatedEvent
}