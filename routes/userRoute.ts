import express from "express";
import userController from "../controllers/userControllers";
import {verifyUser,googleVerifyUser} from "../middleware/auth";
import validation from "../middleware/validation";
import passport from "passport";

const route = express.Router();

//creating user with details
route.post('/create',validation.userCreateValidation,userController.create);
//login user [local(email/password)]
route.post('/login',validation.userLoginValidation,userController.login);
//login user by google authentication 
route.get('/auth/google', passport.authenticate("google", { scope: ["email", "profile"] }));
route.get('/auth/google/callback',userController.loginGoogle);
//get details of specific user 
route.get('/get-user-details',verifyUser,userController.getUser);
//get hotel details by hotel id     
route.get('/get-hotel-details/:hotelId',verifyUser,userController.getHotelDetails);    
//searching  hotels [optional location and rating] without login  
route.get('/search',userController.search);
//booking hotel hotel id
route.post('/booking-room/:hotelId',validation.bookingValidation,verifyUser,userController.booking);
//rating of specific  hotel by hotel id
route.post('/rating/:hotelId',verifyUser,userController.rating);
//review of specific  hotel by hotel id
route.post('/review/:hotelId',verifyUser,userController.review);
//checkout hotel 
route.post('/check-out/:roomId',validation.checkoutValidation,verifyUser,userController.checkOut);

route.put("/update",userController.update)
//logout user
route.get('/logout',userController.logout);


export default route;

