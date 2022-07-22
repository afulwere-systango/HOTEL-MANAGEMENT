import { Request, Response } from "express";
import userService from "../services/userService";
import passport from "passport";


class UserController {
    async getUser(request: Request, response: Response) {
        try {
            let userData = await userService.getUser(request, response);
            response.send(userData);
        } catch (error) {
            console.log("error in get user (userController.js) !");
            response.send(error);
        }
    }

    async postUser(request: Request, response: Response) {
        try {
            let userData = await userService.postUser(request, response);
            //   response.send(empData);
            if(userData==false){
            // console.log(userData,'2222222222222222222222');            
                response.status(409).json({message:'user already exist.... '})
        }
            else{
            console.log('user added successfully....');
            response.send('user added successfully...')
            }
        } catch (error) {
            console.log("error in post user (userController.js) !");
            response.send(error);
        }
    }

     async userLogin(request:Request,response:Response,next:any){
        //  passport.authenticate('local',async()=>{
            let userLogin=await userService.userLogin(request,response,next);
            // response.json({message:{userLogin}})
        // })
        // if(userLogin){
            response.json({message:userLogin});
        // }else{
        //     response.json({message:'login fail..'})
        // }
    }
}


let userController = new UserController();

export default userController;