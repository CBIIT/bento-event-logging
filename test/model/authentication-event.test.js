const {AuthenticationEvent} = require("../../model/authentication-event");
const {expect, test} = require('@jest/globals')

test('Create Authentication Event', () => {
    const email = "test@email.com"
    const id = "123"
    const idp = "test-idp"
    const authenticationEvent = new AuthenticationEvent(id, email, idp);
    expect(authenticationEvent.event_id).toBeDefined();
    expect(authenticationEvent.timestamp).toBeDefined();
    expect(authenticationEvent.user_email).toBe(email);
    expect(authenticationEvent.user_id).toBe(id);
    expect(authenticationEvent.user_idp).toBe(idp);
});
