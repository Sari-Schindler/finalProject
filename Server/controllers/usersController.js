import { UsersService } from '../services/usersService.js'
const usersService = new UsersService();
export class UsersController {

    async getUsers(req, res, next) {
        try {
            // const limit = res.query['limit']
            console.log("user service: ", req.query);
            const resultItems = await usersService.getUsers(req.query)
                return res.status(200).json(resultItems);
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }

    async getUserById(req, res, next) {
        try {
            
            const resultItem = await usersService.getUserById(req.params.id);
                res.status(200).json({ status: 200, data: resultItem });
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }


    async addUser(req, res, next) {
        try {
            const result = await usersService.addUser(req.body);
                res.status(201).json({insertId: result.insertId});
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }


    async deleteUser(req, res, next) {
        try {
            console.log("users");
            console.log(req.params.id);
            const userDetails = await usersService.getUserById(req.params.id);
            authorizeUser(userDetails[0].id, req.user.id, res);
            const response = await usersService.deleteUser(req.params.id);
                res.status(response.affectedRows?204:404).send();
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }

    async updateUser(req, res, next) {
        try {
            console.log("users");
            console.log(req.params.id);
            console.log(req.body);
            const response = await usersService.updateUser(req.body, req.params.id);
                res.status(response.affectedRows?204:404).send();
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }

    async getUsersAlbums(req, res, next){
        try {

            const resultItems = await usersService.getUsersAlbums(req.params.id)
                return res.status(200).json(resultItems);
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }

    async getUsersPosts(req, res, next){
        try {

            const resultItems = await usersService.getUsersPosts(req.params.id)
                return res.status(200).json(resultItems);
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }

    async getUsersTodos(req, res, next){
        try {

            const resultItems = await usersService.getUsersTodos(req.params.id)
                return res.status(200).json(resultItems);
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }


}