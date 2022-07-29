import { Request, Response } from "express";
import userService from "../services/userService";
import passport from "passport";
import UserSchema from '../models/userModel';



class UserController {
    async getUser(request: Request, response: Response, next: any) {
        try {
            let userData = await userService.getUser(request, next);
            response.send(userData);
        } catch (error) {
            console.log("error in get user (userController.js) !");
            response.send(error);
        }
    }

    async postUser(request: any, response: Response, next: any) {
        try {

            let userData: any = await userService.postUser(request, next);
            if (userData) {
                console.log('user added successfully....');
                response.json({ msg: 'user added successfully...' })
            }
            else {
                response.status(409).json({ message: 'user already exist.... ' })
            }

        } catch (error) {
            console.log("error in post user (userController.js) !");
            response.send('error');
        }
    }



    async userLogin(request: Request, response: Response, next: any) {
        try {
            // console.log(request.body)
             passport.authenticate('local',(err, user) => {
                console.log(err,user);
             }
                )
            // let userLogin = await userService.userLogin(request, next);

            // response.json({msg:userLogin})
            // console.log(request.user);
        } catch (error) {
            response.json({ message: error })
        }
    }



    async userLogout(request: any, response: any) {
        // let data=request.session;
        // console.log(data);
        request.session.destroy((err: Error) => {
            if (!err) {
                response.json({ msg: 'logout success.....' })
            } else {
                response.json({ msg: err })
            }
        })
    }
    async updateUser(request: any, response: any) {
        try {
            await userService.updateUser(request, response)
            response.json({ msg: 'update success.....' })

        } catch (error) {

        }
    }
}


let userController = new UserController();

export default userController;