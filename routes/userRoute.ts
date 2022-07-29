import express from "express";
import userController from "../controllers/userControllers";
import passport from "passport";
import passportLocal from "passport-local";
import verifyUser from "../middleware/auth";
import userValidation from "../middleware/userValidation";
const rout = express.Router();


rout.post('/insert_user',userValidation,userController.postUser);
rout.post('/login_user',userController.userLogin);
rout.get('/get_user:id',verifyUser,userController.getUser);    
rout.get('/logout_user',userController.userLogout);
rout.put("/update_user",userController.updateUser)
export default rout;

