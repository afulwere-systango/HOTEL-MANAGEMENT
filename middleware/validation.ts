import { Request, Response } from 'express'
import { validateData } from "../config/validate"
import errorFunction from "../utils/errorFunction";


class Validation {

	userCreateValidation = async (request: Request, response: Response, next: any) => {
		const userCreateData = {
			FirstName: request.body.FirstName,
			LastName: request.body.LastName,
			Phone: request.body.Phone,
			Email: request.body.Email,
			Password: request.body.Password,
		};
		const { error } = validateData.userCreateValidations.validate(userCreateData);
		if (error) {
			return response.status(406).json(errorFunction(true, `Error in User Create Data : ${error.message}`, null));
		} else {
			next();
		}
	};
	userLoginValidation = async (request: Request, response: Response, next: any) => {
		const userLoginData = {
			userEmail: request.body.userEmail,
			userPass: request.body.userPass,
		};
		const { error } = validateData.userLoginValidations.validate(userLoginData);
		if (error) {
			return response.status(406).json(errorFunction(true, `Error in User Login Data : ${error.message}`, null));
		} else {
			next();
		}
	}
	hotelCreateValidation = async (request: Request, response: Response, next: any) => {
		const hotelCreateData = {
			hotelName: request.body.hotelName,
			location: request.body.location,
			rating: request.body.rating,

		};
		const { error } = validateData.hotelCreateValidations.validate(hotelCreateData);
		if (error) {
			return response.status(406).json(errorFunction(true, `Error in Hotel Create Data : ${error.message}`, null));
		} else {
			next();
		}
	}
	roomCreateValidation = async (request: Request, response: Response, next: any) => {
		const roomCreateData = {
			TotalRooms: request.body.TotalRooms,
			ACRooms: request.body.ACRooms,
			NonACRooms: request.body.NonACRooms,
			ACRoomPrice: request.body.ACRoomPrice,
			NonACRoomPrice: request.body.NonACRoomPrice

		};
		const { error } = validateData.roomCreateValidations.validate(roomCreateData);
		if (error) {
			return response.status(406).json(errorFunction(true, `Error in Room Create Data : ${error.message}`, null));
		} else {
			next();
		}
	}
	bookingValidation = async (request: Request, response: Response, next: any) => {
		const bookingData = {
			Child: request.body.Child,
			Adults: request.body.Adults,
			AcRooms: request.body.AcRooms,
			NonAcRooms: request.body.NonAcRooms,
			FromDate: request.body.FromDate,
			ToDate: request.body.ToDate

		};
		const { error } = validateData.bookingValidations.validate(bookingData);
		if (error) {
			return response.status(406).json(errorFunction(true, `Error in Room Create Data : ${error.message}`, null));
		} else {
			next();
		}
	}
	checkoutValidation = async (request: Request, response: Response, next: any) => {
		const checkoutData = {
			checkOutDate: request.body.checkOutDate,
		};
		const { error } = validateData.checkoutValidation.validate(checkoutData);
		if (error) {
			return response.status(406).json(errorFunction(true, `Error in checkout Data : ${error.message}`, null));
		} else {
			next();
		}
	}

}
const validation = new Validation();
export default validation;