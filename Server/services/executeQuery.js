const { createConnection } = require('./db.js');

async function executeQuery(query, params) {
  let results;
  const connection = await createConnection();
  
  try {
    [results] = await connection.execute(query, params);
  } catch (err) {
    throw `error executing query: ${err}`;
  } finally {
    await connection.end();
  }
  
  return results;
}

module.exports = { executeQuery };
