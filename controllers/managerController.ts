import { Request, response, Response } from "express";
import managerService from "../services/managerService";
import errorFunction from "../utils/errorFunction";
import passport from "passport";
import ResponseStatus from "../constants/ResponseStatus";
import TextResponse from "../constants/TextResponse";

class ManagerController {

    async createHotel(request: Request, response: Response, next: any) {
        try {

            const HOTEL_DATA = await managerService.createHotel(request, next);
            if (typeof HOTEL_DATA === "string") {
                response.status(ResponseStatus.STATUS_INCORRECT_DATA).json({ MESSAGE: HOTEL_DATA })
            } else {
                console.log(TextResponse.HOTEL_CREATED);
                response.status(ResponseStatus.STATUS_SUCCESS).json({ DATA: TextResponse.HOTEL_CREATED })
            }
        } catch (error: any) {
            console.log(error, TextResponse.HOTEL_CREATE_ERROR);
            response.status(ResponseStatus.STATUS_SUCCESS).json({ MESSAGE: TextResponse.SOMETHING_WENT_WRONG })
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
            const ROOMS_DATA: any = await managerService.createRooms(request, next);
            if (typeof ROOMS_DATA === 'string') {
                response.status(ResponseStatus.STATUS_INCORRECT_DATA).json({ MESSAGE: ROOMS_DATA })
            } else {
                console.log(TextResponse.ROOMS_INSERTED);
                response.status(ResponseStatus.STATUS_SUCCESS).json({ DATA: TextResponse.ROOMS_INSERTED })
            }
        } catch (error: any) {
            console.log(error, TextResponse.ROOMS_INSERTED_ERROR);
            response.status(ResponseStatus.STATUS_SERVER_ERROR).json(errorFunction());
        }
    }

    async uploadLogoImage(request: Request, response: Response) {
        try {
            const LOBO_IMAGE_DATA = await managerService.uploadLogoImage(request);
            if (typeof LOBO_IMAGE_DATA === 'string') {
                response.status(ResponseStatus.STATUS_INCORRECT_DATA).json({ MESSAGE: LOBO_IMAGE_DATA })
            } else {
                console.log(TextResponse.LOGO_IMAGE_UPLOADED);
                response.status(ResponseStatus.STATUS_SUCCESS).json({ DATA: TextResponse.LOGO_IMAGE_UPLOADED })
            }
        } catch (error: any) {
            response.status(ResponseStatus.STATUS_SERVER_ERROR).json(errorFunction());
        }

    }


    async uploadImages(request: Request, response: Response) {
        try {

            const IMAGE_DATA = await managerService.uploadImages(request);
            if (typeof IMAGE_DATA === 'string') {
                response.status(ResponseStatus.STATUS_INCORRECT_DATA).json({ MESSAGE: IMAGE_DATA })
            }
            else {
                console.log(TextResponse.IMAGE_UPLOADED);
                response.status(ResponseStatus.STATUS_SUCCESS).json({ DATA: TextResponse.IMAGE_UPLOADED })
            }
        } catch (error: any) {
            response.status(ResponseStatus.STATUS_SERVER_ERROR).json(errorFunction());
        }

    }




    //     async googleLogin(request:any){
    //         await passport.authenticate('google', (err:any, user:any) => {
    //             if (err) {
    //             response.status(ResponseStatus.STATUS_SERVER_ERROR).json(errorFunction(true, TextResponse.SOMETHING_WENT_WRONG, null));
    //             }
    //             console.log(user);
    //             }
    //             )(request,response);
    //             // response.append('Authorization',token); 
    //             // response.json({ message: { user, access_token: token } })
    //     }
}

let managerController = new ManagerController();
export default managerController;
