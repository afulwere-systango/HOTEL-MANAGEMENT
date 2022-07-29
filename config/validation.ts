import joi from "joi"
import errorFunction  from "../utils/errorFunction";

const validation = joi.object({
     firstName: joi.string().alphanum().min(3).max(25).trim(true).required(),
     lastName: joi.string().alphanum().min(3).max(25).trim(true).required(),
     userPhone: joi.string().length(10).pattern(/[6-9]{1}[0-9]{9}/).required(),
     userEmail: joi.string().email().trim(true).required(),
     userPass: joi.string().min(4).trim(true).required()
.default([]),
    is_active: joi.boolean().default(true),
});
export default validation;