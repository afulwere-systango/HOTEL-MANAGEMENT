import { Request, Response } from 'express'
import UserSchema from '../models/userModel';
import bcrypt from "bcrypt";
import passport from 'passport';
import {sign} from 'jsonwebtoken'
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

    async postUser(request: Request,next:any) {
        try {            
            
            const newUserData = new UserSchema(request.body);
            const newUserPass = request.body.userPass;            
            const userExist = await UserSchema.findOne({ userEmail: newUserData.userEmail });
            
            if (!userExist) {
                const hashPass = await bcrypt.hash(newUserPass, 10);
                newUserData.userPass = hashPass;
                await newUserData.save();
                return newUserData;
            }
            else {
                return false;
            }
        }
        catch (err) {
            console.log(err, '(userService.ts 11111111111111111)');
            throw  err;            
        }
    }


    async userLogin(request: any, next: any) {
        try{
        
    }
        catch(err){
            throw err;
        }
    }

    async updateUser(request: any, response: Response) {
        try{
            // const newUserData = UserSchema();
            await UserSchema.updateOne({_id:"62e26a09bcb872226a486a31"},
            {
                $push:{userArray:request.body.userArray}
            })
        }catch(err){
            // next(err);
            console.log(err);
            
        }
    }
}

let userService = new UserService();
export default userService;