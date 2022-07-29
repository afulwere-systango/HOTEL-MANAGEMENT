import { Request, Response } from "express";
import managerService from "../services/managerService";
import errorFunction from "../utils/errorFunction";
class ManagerController {

    async postHotel(request: Request, response: Response, next: any) {
        try {
            const DATA = await managerService.postHotel(request, next);
            console.log('hotel data insert successfully....');
            response.json({ msg: 'hotel data insert successfully....' })
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
    async postRooms(request: Request, response: Response, next: any) {

        try {
            const DATA: any = await managerService.postRooms(request, next);
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
    async postUploadHotelIMG(request: Request, response: Response) {

        try {
            const DATA = await managerService.postUploadHotelIMG(request);
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
}

let managerController = new ManagerController();
export default managerController;
