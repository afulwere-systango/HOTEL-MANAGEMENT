import { Request, Response } from 'express'
import UserSchema from '../models/userModel';
import bcrypt from "bcrypt";

class UserService {
    async getUser(request: Request,next:any) {
        try{
        let id = request.params.id;
        const user = await UserSchema.findOne({ _id: id });
        return user;
        }catch(err){
            next(err);
        }
    }

    async postUser(request: Request, response: Response,next:any) {
        try {            
            const newUserData = new UserSchema(request.body);
            const newUserPass = request.body.userPass;
            console.log(newUserPass);
            console.log(newUserData);
            
            const userExist = await UserSchema.findOne({ userEmail: newUserData.userEmail });
            
            if (!userExist) {
                const hashPass = await bcrypt.hash(newUserPass, 10);
                newUserData.userPass = hashPass;
                // console.log(typeof newUserData);
                await newUserData.save();
                return newUserData;
            }
            else {
                console.log('user already exist (userService.ts)!!!');
                return false;
            }
        }
        catch (err) {
            console.log(err, '(userService.ts 11111111111111111)');
            // response.send(err);
            throw  err;
            // next(err);
            
        }
    }


    async userLogin(request: any, response: Response, next: any) {
        try{
        let userData = request.session.passport.user;
           console.log(request.session);
        //    console.log(typeof userData);
        return userData;
        }catch(err){
            next(err);
        }
    }
}

let userService = new UserService();
export default userService;