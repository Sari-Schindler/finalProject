const { executeQuery } = require('./executeQuery.js');
const { getByIdQuery } = require('./query.js');
const bcrypt = require('bcryptjs');

class LoginService {
    async login(email, password) {
        try {
            const password1 = password;
            const query = getByIdQuery('access', 'email');
            const [user] = await executeQuery(query, [email]);
  
            const isMatch = await bcrypt.compare(password, user.password);
            if (user && isMatch) {
                delete user.password; 
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
