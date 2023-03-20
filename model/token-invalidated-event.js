const {SingleUserEvent} = require("./single-user-event");
const {TOKEN_CREATED} = require("../const/event-types");

const TokenInvalidatedEvent = class extends SingleUserEvent{
    constructor(user, token) {
        super(user.ID, user.email, user.IDP);
        this.event_type = TOKEN_CREATED;
        this.token_uuid = token.uuid;
        this.token_expiration = token.expiration;
    };
}

module.exports = {
    TokenInvalidatedEvent
}