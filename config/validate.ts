import joi from "joi"
// import imageExtension from "joi-image-extension"

// const imgJoi = joi.extend(imageExtension)
class ValidateData {

    userCreateValidations = joi.object({
        firstName: joi.string().alphanum().min(3).max(25).trim(true).required(),
        lastName: joi.string().alphanum().min(3).max(25).trim(true).required(),
        userPhone: joi.string().length(10).pattern(/[6-9]{1}[0-9]{9}/).required(),
        userEmail: joi.string().email().trim(true).required(),
        userPass: joi.string().min(4).trim(true).required()
    });

    userLoginValidations = joi.object({
        userEmail: joi.string().email().trim(true).required(),
        userPass: joi.string().min(4).trim(true).required()
    });

    hotelCreateValidations = joi.object({
        hotelName: joi.string().alphanum().min(3).max(25).trim(true).required(),
        location: joi.string().alphanum().min(3).max(25).trim(true).required(),
        rating: joi.number().integer().min(1).max(5).required()
    })
   
    roomCreateValidations = joi.object({
        TotalRooms: joi.number().integer().min(1).max(1000).required(),
        ACRooms: joi.number().integer().min(1).max(1000).required(),
        NonACRooms: joi.number().integer().min(1).max(1000).required(),
        ACRoomPrice: joi.number().integer().min(100).max(200000).required(),
        NonACRoomPrice: joi.number().integer().min(100).max(200000).required(),
    })
    // loboImageInsertValidations=joi.image({

    //     img:joi.image

    // })
}

const validateData = new ValidateData();
export { validateData };