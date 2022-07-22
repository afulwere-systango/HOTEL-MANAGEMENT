import express from "express";
import userController from "../controllers/userControllers";
import passport from "passport";
import passportLocal from "passport-local";

const rout = express.Router();

rout.get('/get_user/:id',userController.getUser);
rout.post('/insert_user',userController.postUser);
rout.post('/login_user',passport.authenticate('local'),userController.userLogin);
export default rout;


//https://github.com/SystangoTechnologies/koach-javascript/blob/master/src/modules/v2/auth/controller.js