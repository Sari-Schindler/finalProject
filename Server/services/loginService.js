const { executeQuery } = require('./executeQuery.js');
const { createQuery, getByIdQuery } = require('./query.js');
const bcrypt = require('bcrypt');

class LoginService {
    async login(email, password) {
        try {
            const password1 = password;
            const query = getByIdQuery('access', 'email');
            const [user] = await executeQuery(query, [email]);
            console.log('logged user', password1);
            console.log("bcrypt     ", user.password);
            const isMatch = await bcrypt.compare(password, user.password);
            console.log("ism", isMatch);
            if (user && isMatch) {
                console.log("got user and compare psw");
                delete user.password; // Remove password from response
                return user;
            }
            return null;
        } catch (error) {
            console.error(error);
            throw new Error('Error authenticating user');
        }
    }

    async getUserByEmail(email) {
        const queryUser = getByIdQuery('users', 'email', true);
        const result = await executeQuery(queryUser, [email]);
        return result;
    }
}

module.exports = { LoginService };
