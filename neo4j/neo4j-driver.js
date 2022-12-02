const neo4j = require('neo4j/neo4j-driver');
const config = require('../config');
const driver = neo4j.driver(
    config.NEO4J_URI,
    neo4j.auth.basic(config.NEO4J_USER, config.NEO4J_PASSWORD),
    {disableLosslessIntegers: true}
);

async function executeQuery(parameters, cypher, returnLabel) {
    const session = driver.session();
    const tx = session.beginTransaction();
    try {
        const result = await tx.run(cypher, parameters);
        return result.records.map(record => {
            return record.get(returnLabel)
        })
    } catch (error) {
        throw error;
    } finally {
        try {
            await tx.commit();
        } catch (err) {
        }
        await session.close();
    }
}

module.exports = {
    executeQuery
}