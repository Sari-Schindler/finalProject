import { createConnection } from './db.js';


async function executeQuery(query, params) {
  let results;
  console.log(params);
  const connection = await createConnection();
  
  try {
    [results] = await connection.execute(query, params);
    console.log("query executed successfully:", results);
  } catch (err) {
    console.log("error executing query:", err);
    throw `error executing query: ${err}`
  } finally {
    await connection.end();
    console.log("connection closed");
  }
  
  return results;
}

export { executeQuery };
