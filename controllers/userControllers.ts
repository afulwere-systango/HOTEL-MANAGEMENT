import e, { Request, Response } from "express";
import userService from "../services/userService";
import passport from "passport";
import UserSchema from '../models/userModel';



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

    async postUser(request: any, response: Response) {
        try {
            // let userData=new UserSchema(request.body);
            // console.log(request.body);
            
            // console.log(userData,'111111111111');
            
            let userData = await userService.postUser(request, response);
            if(userData==false){
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
        
            // let userData=request.session.passport.user;
            let userLogin=await userService.userLogin(request,response,next);
                    if(userLogin.length<100){
                        response.json({message:{userLogin}})
                    }else{
                        response.json({message:'user login success'})
                    }
    }
    async userLogout(request:any,response:any){
        // let data=request.session;
        // console.log(data);
        request.session.destroy((err:Error)=>{
            if(!err){
            response.json({msg:'logout success.....'})
            }else{
                response.json({msg:err})
            }
        })
    }
}


let userController = new UserController();

export default userController;