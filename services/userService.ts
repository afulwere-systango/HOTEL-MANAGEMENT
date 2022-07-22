import { Request, Response } from 'express'
import UserSchema from '../models/userModel';
import bcrypt from "bcrypt";

class UserService {
    async getUser(request: Request, response: Response) {
        let id = request.params.id;
        // console.log(id);
        // id='62d79e3427dd663218f519bb';
        const user = await UserSchema.findOne({ _id: id });
        // console.log(user);

        // user.forEach(element => {
        //     console.log(element.userEmail);
        //     console.log(element.userPass);

        // });
        return user;
    }

    async postUser(request: Request, response: Response) {
        try {            
            const newUserData = new UserSchema(request.body);
            
            const newUserPass = request.body.userPass;
            
            const userExist = await UserSchema.findOne({ userEmail: newUserData.userEmail });
            
            if (!userExist) {
                const hashPass = await bcrypt.hash(newUserPass, 10);
                newUserData.userPass = hashPass;
                console.log(typeof newUserData);
                await newUserData.save();
                return newUserData;
            }
            else {
                console.log('user already exist (userService.ts)!!!');
                return false;
            }
        }
        catch (err) {
            console.log(err, '(userService.ts)');
            response.send(err);
        }
    }


    async userLogin(request: any, response: Response, next: any) {
        let userData = request.session.passport.user;
           console.log(request.session);
           console.log(typeof userData);
        return userData;

    }
}

let userService = new UserService();
export default userService;