const {SingleUserEvent} = require("./single-user-event");
const {TOKEN_INVALIDATED} = require("../const/event-types");

const TokenInvalidatedEvent = class extends SingleUserEvent{
    constructor(user, tokenUUIDs) {
        super(user.ID, user.email, user.IDP);
        this.event_type = TOKEN_INVALIDATED;
        this.token_uuids = tokenUUIDs;
    };
}

module.exports = {
    TokenInvalidatedEvent
}