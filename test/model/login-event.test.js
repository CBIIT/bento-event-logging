const {LoginEvent} = require("../../model/login-event.js");
const {LOGIN} = require("../../const/event-types.js");
const {expect} = require("@jest/globals");

test('Create Login Event', () => {
    const email = "test@email.com"
    const id = "123"
    const idp = "test-idp"
    const loginEvent = new LoginEvent(id, email, idp);
    expect(loginEvent.event_id).toBeDefined();
    expect(loginEvent.timestamp).toBeDefined();
    expect(loginEvent.user_email).toBe(email);
    expect(loginEvent.user_id).toBe(id);
    expect(loginEvent.user_idp).toBe(idp);
    expect(loginEvent.event_type).toBe(LOGIN);
});
test('Get Create Command', () => {
    const email = "test@email.com"
    const id = "123"
    const idp = "test-idp"
    const loginEvent = new LoginEvent(id, email, idp);
    expect(loginEvent.getCreateCommand()).toBeDefined();
    expect(typeof loginEvent.getCreateCommand()).toBe('string')
    console.log(loginEvent.getCreateCommand());
});
