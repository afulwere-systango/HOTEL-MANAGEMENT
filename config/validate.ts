import joi from "joi"
// import imageExtension from "joi-image-extension"

// const imgJoi = joi.extend(imageExtension)
class ValidateData {

    userCreateValidations = joi.object({
        FirstName: joi.string().alphanum().min(3).max(25).trim(true).required(),
        LastName: joi.string().alphanum().min(3).max(25).trim(true).required(),
        Phone: joi.string().length(10).pattern(/[6-9]{1}[0-9]{9}/).required(),
        Email: joi.string().email().trim(true).required(),
        Password: joi.string().min(4).trim(true).required()
    });

    userLoginValidations = joi.object({
        Email: joi.string().email().trim(true).required(),
        Password: joi.string().min(4).trim(true).required()
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

    bookingValidations = joi.object({
        Child: joi.number().integer().min(1).max(1000).required(),
        Adults: joi.number().integer().min(1).max(1000).required(),
        AcRooms: joi.number().integer().min(0).max(1000).required(),
        NonAcRooms: joi.number().integer().min(0).max(1000).required(),
        FromDate: joi.date().iso(),
        ToDate :joi.date().iso().min(joi.ref('FromDate'))
    })
    checkoutValidation = joi.object({
        checkOutDate: joi.date().iso(),    
    })
}

const validateData = new ValidateData();
export { validateData };