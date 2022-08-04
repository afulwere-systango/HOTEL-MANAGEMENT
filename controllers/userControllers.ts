import { Request, Response } from "express";
import userService from "../services/userService";
import passport from "passport";
import UserSchema from '../models/userModel';
import jwt from "jsonwebtoken";



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
    async create(request: any, response: Response, next: any) {
        try {

            let userData: any = await userService.create(request, next);
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
    async login(request: any, response: Response, next: any) {
        try {
            // console.log(request.body)
            // console.log('1111');
            let token: any;
            await passport.authenticate('local', (err, user) => {
                if (err) {
                    throw err;
                }
                console.log(user._id);
                token = jwt.sign(
                    { user_id: user._id },
                    `${process.env.TOKEN_KEY}`
                    // {
                    //   expiresIn: "2h",
                    // }
                );
                response.append('Authorization', token);
                response.json({ message: { user, access_token: token } })
            }
            )(request, response, next)
        } catch (error) {
            response.json({ message: error })
        }
    }
    async search(request: any, response: any) {



        try {
        
            
            const HOTEL_DATA = await userService.login(request);
            if(HOTEL_DATA.length){
            response.json({ message: HOTEL_DATA })
            }else{
            response.json({ message: 'hotel not found' })
            }
        } catch (error) {
            console.log(error);
            response.json({message:error})
        }


    }


    async logout(request: any, response: any) {
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
    async update(request: any, response: any) {
        try {
            await userService.update(request, response)
            response.json({ msg: 'update success.....' })

        } catch (error) {

        }
    }
    async loginGoogle(request: any, response: any) {
        try {
            passport.authenticate('google', (err, user) => {
                if (err) {
                    throw err;
                }
                // response.append('Authorization', token);
                response.json({ message: { user } })
            })(request, response);
        } catch (err) {
            console.log(err);
        }
    }
}

let userController = new UserController();

export default userController;