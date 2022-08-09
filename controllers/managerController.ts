import { Request, response, Response } from "express";
import managerService from "../services/managerService";
import errorFunction from "../utils/errorFunction";
import passport from "passport";

class ManagerController {

    async createHotel(request: Request, response: Response, next: any) {
        try {
            await managerService.createHotel(request, next);
            console.log('hotel created successfully.');
            response.json({ msg: 'hotel created successfully.' })
        } catch (error:any) {
            console.log('error in managerController.ts');
            response.json(
                errorFunction(true, `Error in hotel Data : ${error.message}`, null)
            );
        }

    }

    async getimg(request: Request, response: Response, next: any) {
        try {
            const data = await managerService.getimg(request, next);
            response.json({ msg: data })
        } catch (error) {
            response.json({ msg: { error } })
        }
    }
    async createRooms(request: Request, response: Response, next: any) {

        try {
            const DATA: any = await managerService.createRooms(request, next);
            if (typeof DATA==='string') {
              response.json({ msg: DATA })
            }else{
            response.json({ msg: 'room inserted successfully...' })
            }
        } catch (error: any) {
            // console.log(error,'line 35');
            console.log('error in managerController.ts');
            // response.json({msg:{error}});
            response.json(
                errorFunction(true, `Error in Rooms Data : ${error.message}`, null)
            );
        }

    }
    async uploadLogoImage(request: Request, response: Response) {
        try {
            const DATA = await managerService.uploadLogoImage(request);
            if (typeof DATA==='string') {
                response.json({ msg:  DATA})
            } else {
                response.json({ msg: 'images added successfully....' })
            }
        } catch (error: any) {
            response.json(
                errorFunction(true, `Error in images Data : ${error.message}`, null)
            );
        }

    }
    
    
    async uploadImages(request: Request, response: Response) {

        try {
            console.log(2222);
            
            const DATA = await managerService.uploadImages(request);
            // console.log(DATA);
            
                response.json({ msg: DATA })
            
        } catch (error: any) {
            
            response.json(
                errorFunction(true, `Error in images Data : ${error.message}`, null)
            );
        }

    }




    async googleLogin(request:any){
        await passport.authenticate('google', (err:any, user:any) => {
            if (err) {
                throw err;
            }
            console.log(user);
            }
            )(request,response);
            // response.append('Authorization',token); 
            // response.json({ message: { user, access_token: token } })


    }
}

let managerController = new ManagerController();
export default managerController;
