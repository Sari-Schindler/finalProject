import { executeQuery } from './executeQuery.js';
import { createQuery, getByIdQuery } from './query.js'
import bcrypt from 'bcrypt';

export class LoginService{
    async login(email, password){
        try {
            const password1=password;
            const query = getByIdQuery('access', 'email');
            const [user] = await executeQuery(query, [email]);
            if(user)
                console.log('logged user',password1, user.password)
            if (user && await bcrypt.compare(password1, user.password)) {
                debugger
                if (user && password1 == user.password) {
                console.log("got user and compare psw")
                delete user.psw; // Remove password from response
                return user;
            }
        }
            return null;
        } catch (error) {
            console.error(error);
            throw new Error('Error authenticating user');
        }
    };

    async getUserByEmail(email){
        const queryUser = getByIdQuery('users', 'email', true);
        const result =  await executeQuery(queryUser, [email]);
        return result;
    }
    
}
