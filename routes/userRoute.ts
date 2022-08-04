import express from "express";
import userController from "../controllers/userControllers";
import verifyUser from "../middleware/auth";
import userValidation from "../middleware/userValidation";
import passport from "passport";
const route = express.Router();


route.post('/create',userValidation,userController.create);
route.post('/login',userController.login);

route.post('/search/:location?/:rating?',userController.search);

route.get('/get_user:id',verifyUser,userController.getUser);    
route.get('/logout',userController.logout);
route.put("/update",userController.update)

route.get('/auth/google', passport.authenticate("google", { scope: ["email", "profile"] }));
route.get('/auth/google/callback',userController.loginGoogle);


export default route;

