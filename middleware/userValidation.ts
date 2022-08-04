import { Request, Response } from 'express'
import validation from "../config/validation"
import errorFunction  from "../utils/errorFunction";

const userValidation = async (request:Request, response:Response, next:any) => {
    // console.log(typeof request.body.userPhone);
    
	const payload = {
		firstName: request.body.firstName,
		lastName: request.body.lastName,
		userPhone: request.body.userPhone,
        userEmail: request.body.userEmail,
		userPass: request.body.userPass,
	};
    console.log(payload);    

	const { error } = validation.validate(payload);
	if (error) {
		response.status(406);
		return response.json(
			errorFunction(true, `Error in User Data : ${error.message}`,null)
        );
	} else {
		next();
	}
};
export default userValidation;