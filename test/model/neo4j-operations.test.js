const {expect, test, beforeAll, beforeEach, afterEach, afterAll, describe} = require('@jest/globals');
const {logEvent, getLastLogin, executeQuery} = require("../../neo4j/neo4j-operations");
const neo4j = require('neo4j-driver');
const {LoginEvent} = require("../../model/login-event");
const {DownloadEvent} = require("../../model/download-event");
const {RegistrationEvent} = require("../../model/registration-event");
const {LogoutEvent} = require("../../model/logout-event");
const {SessionTimeoutEvent} = require("../../model/session-timeout-event");
const {UpdateEvent} = require("../../model/update-event");
const {RequestEvent} = require("../../model/request-event");
const {ReviewEvent} = require("../../model/review-event");
const driver = neo4j.driver(
    process.env.TEST_NEO4J_URI,
    neo4j.auth.basic(process.env.TEST_NEO4J_USER, process.env.TEST_NEO4J_PASSWORD),
    {disableLosslessIntegers: true}
);
const email = "test@email.com";
const id = "123";
const idp = "testing-idp";


afterAll(async () => {
    await driver.close();
});

beforeEach(async () => {
    const cypher = `
        MATCH (e:Event)
        WHERE e.user_idp = 'testing-idp'
        DETACH DELETE e
    `
    await executeQuery(driver, {}, cypher, null);
});

describe("Event Initialization Tests", () => {
    const armID = "arm id";
    const armName = "arm name";

    test('Test Login Event', async () => {
        const loginEvent = new LoginEvent(id, email, idp);
        verifyAllKeysAreDefined(loginEvent);
        expect(await logEvent(driver, loginEvent)).toBe(true);
    });

    test('Test Logout Event', async () => {
        const logoutEvent = new LogoutEvent(id, email, idp);
        verifyAllKeysAreDefined(logoutEvent)
        expect(await logEvent(driver, logoutEvent)).toBe(true);
    });

    test('Test Session Timeout Event', async () => {
        const sessionTimeoutEvent = new SessionTimeoutEvent(id, email, idp);
        verifyAllKeysAreDefined(sessionTimeoutEvent)
        expect(await logEvent(driver, sessionTimeoutEvent)).toBe(true);
    });

    test('Test Download Event', async () => {
        const downloadEvent = new DownloadEvent(id, email, idp, ".test", "test-file-id", "Test Name", 100);
        verifyAllKeysAreDefined(downloadEvent);
        expect(await logEvent(driver, downloadEvent)).toBe(true);
    });

    test('Test Update Event', async () => {
        const oldValue = "old organization";
        const newValue = "new organization";
        const updatedField = "updated field";
        const updateEvent = new UpdateEvent(updatedField, oldValue, newValue, id, email, idp, id, email, idp);
        verifyAllKeysAreDefined(updateEvent);
        expect(await logEvent(driver, updateEvent)).toBe(true);
    });

    test('Test Registration Event', async () => {
        const registrationEvent = new RegistrationEvent(id, email, idp);
        verifyAllKeysAreDefined(registrationEvent);
        expect(await logEvent(driver, registrationEvent)).toBe(true);
    });

    test('Test Request Event', async () => {
        const requestEvent = new RequestEvent(armID, armName, id, email, idp);
        verifyAllKeysAreDefined(requestEvent);
        expect(await logEvent(driver, requestEvent)).toBe(true);
    });

    test('Test Review Event', async () => {
        const newStatus = "new status";
        const oldStatus = "old status";
        const reviewEvent = new ReviewEvent(armID, armName, id, email, idp, newStatus, oldStatus, id, email, idp);
        verifyAllKeysAreDefined(reviewEvent);
        expect(await logEvent(driver, reviewEvent)).toBe(true);
    });
})

test('Get Last Login Test', async () => {
    // Get last login with no events in database
    let result = await getLastLogin(driver, id, email, idp);
    expect(result[0]).toBeNull();
    // Create login events
    for (let i = 0; i < 4; i++){
        let loginEvent = new LoginEvent(id, email, idp);
        expect(await logEvent(driver, loginEvent)).toBe(true);
    }
    // Create last login event
    const lastID = 'last';
    let loginEvent = new LoginEvent(lastID, email, idp);
    expect(await logEvent(driver, loginEvent)).toBe(true);
    // Get last login
    result = await getLastLogin(driver, lastID, email, idp);
    expect(result[0]).toBeDefined();
});

test('Test No DB connection', async () => {
    // Create last login event
    let event = new LoginEvent(id, email, idp);
    expect(await logEvent(null, event)).toBe(false);
});

function verifyAllKeysAreDefined(object){
    const keys = Object.keys(object);
    keys.forEach(key => expect(object[key]).toBeDefined());
}