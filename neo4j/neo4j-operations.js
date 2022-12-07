

const logEvent = async function (neo4jDriver, bentoEvent){
    try{
        await executeQuery(neo4jDriver, {}, getCreateCommand(bentoEvent), null);
        return true;
    }
    catch(exception){
        console.error(exception);
        return false;
    }
}

const getLastLogin = async function (neo4jDriver, userID, userEmail, userIDP){
    const cypher = `
        MATCH (e:Event)
        WHERE
            e.user_id = '${userID}' AND
            e.user_email = '${userEmail}' AND
            e.user_idp = '${userIDP}'
        WITH e
        ORDER BY e.timestamp DESC
        RETURN COLLECT(e)[0] AS event
    `
    return await executeQuery(neo4jDriver, {}, cypher, 'event')
}

const getUserID = async function (neo4jDriver, userEmail, userIDP){
    const cypher = `
        MATCH (u:User)
        WHERE 
            u.email = '${userEmail}' AND 
            u.IDP = '${userIDP}'
        RETURN u.userID AS userID
    `
    return (await executeQuery(neo4jDriver, {}, cypher, 'userID'))[0];
}

const getCreateCommand = function(bentoEvent){
    const keys = Object.keys(bentoEvent);
    let cypher = "CREATE (e:Event) ";
    keys.forEach(key => cypher += `SET e.${key} = '${bentoEvent[key]}' `);
    return cypher;
}

async function executeQuery(driver, parameters, cypher, returnLabel) {
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
    logEvent,
    getLastLogin,
    getUserID,
    getCreateCommand,
    executeQuery
}