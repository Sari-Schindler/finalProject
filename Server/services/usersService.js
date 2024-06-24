import { executeQuery } from './executeQuery.js';
import {getByIdQuery, getQuery, deleteQuery, updateQuery, createQuery, softDeleteQuery } from './query.js'

export class UsersService {

    async getUsers(queryParams) {
        const queryUser = getQuery('users',queryParams, true);
        const result = await executeQuery(queryUser.query, queryUser.params);
        return result;
    }

    async getUserById(id) {
        const queryUser = getByIdQuery('users', 'id', true);
        const result =  await executeQuery(queryUser, [id]);
        return result;
    }

    async addUser(userItem) {
        const queryUser = createQuery('users', "name, username, email, address, phone", "?,?,?,?,?");
        const result =  await executeQuery(queryUser, [userItem.name, userItem.username, userItem.email, userItem.address, userItem.phone]);
        return result;

    }

    async deleteUser(id){
        const user = await executeQuery(getByIdQuery("users","id"), [id]);
        const result = await executeQuery(softDeleteQuery('users', 'id'), [id]);
        await executeQuery(deleteQuery("todos", "userId"),[id]);
        await this.deleteUsersAlbums(user[0]);
        await this.deleteUsersPosts(user[0]);
        await executeQuery(deleteQuery("comments", "email"),[user[0].email]);
        return result;
    }

    async deleteUsersAlbums(user){
        const userAlbums = await executeQuery(getByIdQuery("albums", "userId"),[id]);
        userAlbums.forEach(async el => await executeQuery(deleteQuery("photos", "albumId"),[el.id]));
        await executeQuery(deleteQuery("albums", "userId"),[user.id]);
    }

    async deleteUsersPosts(user){
        const userPosts = await executeQuery(getByIdQuery("posts", "userId"),[id]);
        userPosts.forEach(async el => await executeQuery(deleteQuery("comments", "postId"),[el.id]));
        await executeQuery(deleteQuery("posts", "userId"),[user.id]);
    }

    async updateUser(userItem, id){
        const queryUser = updateQuery('users', 'id', usersColumns, true);
        const result =  await executeQuery(queryUser, [userItem.name, userItem.username, userItem.email, userItem.address, userItem.phone, id]);
        return result;
    }

    async getUsersAlbums(id){
        const queryUser = getByIdQuery('albums', 'userId');
        const result =  await executeQuery(queryUser, [id]);
        return result;
    }

    async getUsersPosts(id){
        const queryUser = getByIdQuery('posts', 'userId');
        const result =  await executeQuery(queryUser, [id]);
        return result;
    }
    async getUsersTodos(id){
        const queryUser = getByIdQuery('todos', 'userId');
        const result =  await executeQuery(queryUser, [id]);
        return result;
    }

    
}


const usersColumns = "name =?, userName =?, email=?, address=?, phone=?"

