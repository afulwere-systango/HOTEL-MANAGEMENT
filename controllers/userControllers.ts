import { Request, Response } from "express";
import userService from "../services/userService";
import passport from "passport";
import errorFunction from "../utils/errorFunction";
import ResponseStatus from "../constants/ResponseStatus";
import jwt from "jsonwebtoken";
import TextResponse from "../constants/TextResponse";

class UserController {

    async create(request: Request, response: Response) {
        try {
            const USER_DATA: any = await userService.create(request);
            if (typeof USER_DATA === 'string') {
                response.status(ResponseStatus.STATUS_INCORRECT_DATA).json({ message: USER_DATA })
            } else {
                console.log(TextResponse.USER_CREATED);
                response.status(ResponseStatus.STATUS_SUCCESS).json({ MESSAGE: TextResponse.USER_CREATED })
            }
        } catch (error: any) {
            console.log(error, TextResponse.USER_CREATE_ERROR);
            response.status(ResponseStatus.STATUS_SERVER_ERROR).json(errorFunction(true, TextResponse.USER_CREATE_ERROR, null));
        }
    }
    async login(request: Request, response: Response, next: any) {
        try {
            let token: any;
            await passport.authenticate('local', (error: Error, user: any) => {
                if (error) {
                    response.status(ResponseStatus.STATUS_SERVER_ERROR).json(errorFunction(true, TextResponse.SOMETHING_WENT_WRONG, null));
                }
                token = jwt.sign(
                    { user_id: user._id },
                    `${process.env.TOKEN_KEY}`
                    // {
                    //   expiresIn: "2h",
                    // }
                );

                if (typeof user === 'string') {
                    response.status(ResponseStatus.STATUS_INCORRECT_DATA).json({ MESSAGE: user })
                } else {
                    response.append('Authorization', token);
                    response.status(ResponseStatus.STATUS_SUCCESS).json({ MESSAGE: TextResponse.LOGIN })
                    console.log(TextResponse.LOGIN);
                }
            }
            )(request, response, next)
        } catch (error: any) {
            console.log(error, TextResponse.LOGIN_ERROR);
            response.status(ResponseStatus.STATUS_SERVER_ERROR).json(errorFunction(true, TextResponse.SOMETHING_WENT_WRONG, null));
        }
    }
    async getUser(request: Request, response: Response) {
        try {
            const USER_DATA = await userService.getUser(request);
            if (typeof USER_DATA === 'string') {
                response.status(ResponseStatus.STATUS_INCORRECT_DATA).json({ MESSAGE: USER_DATA })

            } else {
                response.status(ResponseStatus.STATUS_SUCCESS).json({ DATA: USER_DATA })
            }
        }
        catch (error: any) {
            console.log(error, TextResponse.USER_GET_ERROR);
            response.status(ResponseStatus.STATUS_SERVER_ERROR).json(errorFunction(true, TextResponse.SOMETHING_WENT_WRONG, null));
        }
    }
    async getHotelDetails(request: Request, response: Response, next: any) {
        try {
            const HOTEL_DATA = await userService.getHotelDetails(request);
            if (typeof HOTEL_DATA === 'string') {
                response.status(ResponseStatus.STATUS_INCORRECT_DATA).json({ MESSAGE: HOTEL_DATA })

            } else {
                response.status(ResponseStatus.STATUS_SUCCESS).json({ DATA: HOTEL_DATA })
            }
        }
        catch (error: any) {
            console.log(error, TextResponse.HOTEL_GET_ERROR);
            response.status(ResponseStatus.STATUS_SERVER_ERROR).json(errorFunction(true, TextResponse.SOMETHING_WENT_WRONG, null));
        }
    }
    async search(request: any, response: any) {
        try {
            const HOTEL_DATA = await userService.search(request);
            if (HOTEL_DATA.length) {
                response.status(ResponseStatus.STATUS_SUCCESS).json({ DATA: HOTEL_DATA })
            } else {
                response.status(ResponseStatus.STATUS_INCORRECT_DATA).json({ MESSAGE: TextResponse.HOTEL_NOT_FOUND })
            }
        } catch (error) {
            console.log(error, TextResponse.SEARCH_HOTEL_ERROR);
            response.status(ResponseStatus.STATUS_SERVER_ERROR).json(errorFunction(true, TextResponse.SOMETHING_WENT_WRONG, null));
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
            passport.authenticate('google', (err: Error, user: any) => {
                if (err) {
                    response.status(ResponseStatus.STATUS_SERVER_ERROR).json(errorFunction(true, TextResponse.SOMETHING_WENT_WRONG, null));
                }
                response.append('Authorization', user);
                response.status(ResponseStatus.STATUS_SUCCESS).json({ MESSAGE: user })
            })(request, response);
        } catch (error) {
            console.log(error, TextResponse.GOOGLE_LOGIN_ERROR);
            response.status(ResponseStatus.STATUS_SERVER_ERROR).json(errorFunction(true, TextResponse.SOMETHING_WENT_WRONG, null));
        }
    }
    async booking(request: any, response: any) {

        try {
            const BOOKING_DATA = await userService.booking(request);
            if (typeof BOOKING_DATA === 'string') {
                response.status(ResponseStatus.STATUS_INCORRECT_DATA).json({ MESSAGE: BOOKING_DATA })

            } else {
                const ResponseMessage = TextResponse.BOOKING + BOOKING_DATA.roomsPrice;
                response.status(ResponseStatus.STATUS_SUCCESS).json({ MESSAGE: ResponseMessage })
            }
        } catch (error) {
            console.log(error, TextResponse.BOOKING_ERROR);
            response.status(ResponseStatus.STATUS_SERVER_ERROR).json(errorFunction(true, TextResponse.SOMETHING_WENT_WRONG, null));
        }
    }
    async checkOut(request: any, response: any) {
        try {
            const CHECK_OUT_DATA: any = await userService.checkOut(request);
            response.status(ResponseStatus.STATUS_SUCCESS).json({ MESSAGE: CHECK_OUT_DATA })

        } catch (error) {
            console.log(error, TextResponse.CHECKOUT_ERROR);
            response.status(ResponseStatus.STATUS_SERVER_ERROR).json(errorFunction(true, TextResponse.SOMETHING_WENT_WRONG, null));
        }
    }
    async logout(request: any, response: any) {
        request.session.destroy((err: Error) => {
            if (!err) {
                response.status(ResponseStatus.STATUS_SUCCESS).json({ MESSAGE: TextResponse.LOGOUT })
            } else {
                console.log(TextResponse.LOGIN_ERROR);
                response.status(ResponseStatus.STATUS_SERVER_ERROR).json(errorFunction(true, TextResponse.SOMETHING_WENT_WRONG, null));
            }
        })
    }
}

let userController = new UserController();

export default userController;