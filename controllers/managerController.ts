import { Request, response, Response } from "express";
import managerService from "../services/managerService";
import errorFunction from "../utils/errorFunction";
import passport from "passport";

class ManagerController {

    async createHotel(request: Request, response: Response, next: any) {
        try {
             await managerService.createHotel(request, next);
            console.log('hotel created successfully....');
            response.json({ msg: 'hotel created successfully....' })
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
            if (DATA) {

                console.log('room inserted successfully ....', DATA);
                response.json({ msg: 'room inserted successfully...' })
            }
            else {
                response.json({ msg: 'first fill hotel details.../your hotel rooms already exist you can update it now.....' })
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
    async uploadIMG(request: Request, response: Response) {

        try {
            const DATA = await managerService.uploadIMG(request);
            console.log(DATA);
            if (DATA) {
                response.json({ msg: 'images added successfully...' })
            } else {
                response.json({ msg: 'first fill hotel details...' })
            }
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
