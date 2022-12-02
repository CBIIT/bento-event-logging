const {BentoEvent} = require("../../model/bento-event");
const {expect, test} = require('@jest/globals')

test('Create Bento Event', () => {
    const bentoEvent = new BentoEvent();
    expect(bentoEvent.event_id).toBeDefined();
    expect(bentoEvent.timestamp).toBeDefined();
});
