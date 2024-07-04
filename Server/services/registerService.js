const { executeQuery } = require('./executeQuery.js');
const { getByIdQuery, getQuery, deleteQuery, updateQuery, createQuery, softDeleteQuery } = require('./query.js');

class RegisterService {

    async getUsers(queryParams) {
        const queryUser = getQuery('users', queryParams, true);
        const result = await executeQuery(queryUser.query, queryUser.params);
        return result;
    }

    async addUser(userItem) {
        const queryUser = createQuery('users', "type, username, email", "?,?,?");
        const queryAccess = createQuery('access', "email, password", "?,?");
        const userResult =  await executeQuery(queryUser, [userItem.type, userItem.username, userItem.email]);
        const accessResult =  await executeQuery(queryAccess, [userItem.email, userItem.password]);
        return { userResult, accessResult };
    }
}

const usersColumns = "type =?, userName =?, email=?";

module.exports = { RegisterService, usersColumns };
