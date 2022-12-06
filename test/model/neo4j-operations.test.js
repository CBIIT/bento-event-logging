const {expect, test, beforeAll, beforeEach, afterEach, afterAll} = require('@jest/globals');
const {logEvent, getLastLogin, executeQuery} = require("../../neo4j/neo4j-operations");
const neo4j = require('neo4j-driver');
const {LoginEvent} = require("../../model/login-event");
const driver = neo4j.driver(
    process.env.TEST_NEO4J_URI,
    neo4j.auth.basic(process.env.TEST_NEO4J_USER, process.env.TEST_NEO4J_PASSWORD),
    {disableLosslessIntegers: true}
);

afterAll(async () => {
    await driver.close();
});

beforeEach(async () => {
    const cypher = `
        MATCH (e:Event)
        WHERE e.user_idp = 'test-idp'
        DETACH DELETE e
    `
    await executeQuery(driver, {}, cypher, null);
});

test('Test Log Events', async () => {
    const email = "test@email.com"
    const id = "123"
    const idp = "test-idp"
    const loginEvent = new LoginEvent(id, email, idp);
    expect(await logEvent(driver, loginEvent)).toBe(true);
});

test('Get Last Login Test', async () => {
    const email = "test@email.com"
    const id = "123"
    const idp = "test-idp"
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
    expect(result[0].properties['user_id']).toBe(lastID);
});

test('Test No DB connection', async () => {
    const email = "test@email.com"
    const id = "123"
    const idp = "test-idp"
    // Create last login event
    let event = new LoginEvent(id, email, idp);
    expect(await logEvent(null, event)).toBe(false);
});