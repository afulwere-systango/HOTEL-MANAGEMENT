import { Request, Response } from 'express'
import { validateData } from "../config/validate"
import errorFunction from "../utils/errorFunction";


class Validation {

	userCreateValidation = async (request: Request, response: Response, next: any) => {
		const userCreateData = {
			firstName: request.body.firstName,
			lastName: request.body.lastName,
			userPhone: request.body.userPhone,
			userEmail: request.body.userEmail,
			userPass: request.body.userPass,
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
	hotelCreateValidation=async (request: Request, response: Response, next: any) => {
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
	roomCreateValidation=async (request: Request, response: Response, next: any) => {
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

}
const validation = new Validation();
export default validation;