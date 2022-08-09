import { Request, Response } from "express";
import userService from "../services/userService";
import passport from "passport";
import errorFunction  from "../utils/errorFunction";
import ResponseStatus from "../constants/ResponseStatus";
import {USERS} from '../models/userModel';
import jwt from "jsonwebtoken";

class UserController {
   

    async create(request: Request, response: Response) {
        try {

            const DATA : any = await userService.create(request);
            if (typeof DATA==='string' ) {
                response.status(409).json({ message: DATA })
            }else {
                console.log('user added successfully....');
                response.json({ msg: 'USER CREATED SUCCESSFULLY !' })

            }
        } catch (error:any) {
            console.log("error in post user (userController.js) !");
		    response.status(406).json(errorFunction(true, `Error : ${error.message}`,null));        
        }
    }

    async login(request: Request, response: Response, next: any) {
        try {
            let token: any;
            await passport.authenticate('local', (error, user) => {
                if (error) {
                    response.status(406).json(errorFunction(true, `Error : ${error.message}`,null));                            
                }
                token = jwt.sign(
                    { user_id: user._id },
                    `${process.env.TOKEN_KEY}`
                    // {
                    //   expiresIn: "2h",
                    // }
                );

                if(typeof user==='string'){
                response.json({ message: user })
                }else{
                response.append('Authorization', token);
                response.json({ message: "LOGGED IN." })
                console.log('user logged in.');
                
                }
            }
            )(request, response, next)
        } catch (error:any) {
            response.status(406).json(errorFunction(true, `Error : ${error.message}`,null));                            
        }
    }
   
   
    async getUser(request: Request, response: Response, next: any) {
        try {
            const USER_DATA = await userService.getUser(request);
            if(typeof USER_DATA==='string'){
                response.json({ message: USER_DATA })
            }else{
                response.json({DATA:USER_DATA});
            }
        }
         catch (error:any) {
            console.log(error,"error in get user (userController.js) !");
            response.status(406).json(errorFunction(true, `Something want wring !!! `,null));                            

        }
    }
   
    async getHotelDetails(request: Request, response: Response, next: any) {
        try {
            const HOTEL_DATA = await userService.getHotelDetails(request);
            if(typeof HOTEL_DATA==='string'){
                response.json({ message: HOTEL_DATA })
            }else{
            response.json({DATA:HOTEL_DATA});
            }
        }
         catch (error:any) {
            console.log("error in get hotel (userController.js) !");
            response.status(406).json(errorFunction(true, `Something want wring !!! `,null));                            

        }
    }
   
    async search(request: any, response: any) {
        try {
            const HOTEL_DATA = await userService.search(request);
            if(HOTEL_DATA.length){
            response.status(ResponseStatus.STATUS_SUCCESS).json({ DATA: HOTEL_DATA })
            }else{
            response.status(ResponseStatus.STATUS_NOT_FOUND).json({ message: "Hotel not found." })
            }
        } catch (error) {
            console.log(error,"error in get hotel (userController.js) !");
            response.status(ResponseStatus.STATUS_SERVER_ERROR).json(errorFunction(true, `Something want wring !!! `,null));                            
        }


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
                response.append('Authorization', user);
                response.append('Aaaaaaaaaaaaaaaaaaaaaaaaaaaa', "demo");
                console.log('aapend');
                
                response.json({ message: { user } })
            })(request, response);
        } catch (err) {
            console.log(err);
            response.json({ message: { err } })
        }
    }
    async roomBooking(request:any,response:any){

        try {
            const DATA = await userService.roomBooking(request);
            if(typeof  DATA==='string'){
            response.json({ message: DATA })
            }else{
            response.json({ message: {'congrats ! your room book successfully!!! rooms price :': DATA.roomsPrice} })
            }
        } catch (error) {
            response.json({ message: { error } })
        }
    }
    async checkOut(request:any,response:any){
        try {
            const DATA:any=await userService.checkOut(request);
            // DATA.catch((msg:any)=>{
            //     console.log(msg);
                
            // })
            response.json({ message: DATA })
        } catch (error) {
            response.json({ message: "something wrong" })
            
        }
    }
    async logout(request: any, response: any) {
        request.session.destroy((err: Error) => {
            if (!err) {
                response.json({ msg: 'logout success.....' })
            } else {
                response.json({ msg: err })
            }
        })
    }
  

}

let userController = new UserController();

export default userController;