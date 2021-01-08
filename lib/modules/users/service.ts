import { IUser } from './model';
import users from './schema';

export default class UserService {
    
    public createUser(user_params: IUser, callback: any) {
        const _session = new users(user_params);
        _session.save(callback);
    }

    public filterUser(query: any, callback: any) {
        users.findOne(query, callback);
    }

    public async updateUser(user_params: IUser, callback: any) {
        const query = { _id: user_params._id };
        const user = await users.findOne(query);
        const updates = Object.keys(user_params);
        updates.forEach((update: string) => {
            user[update] = user_params[update];
        });
        await user.save(callback);
    }
    
    public deleteUser(_id: string, callback: any) {
        const query = { _id };
        users.deleteOne(query, callback);
    }

}