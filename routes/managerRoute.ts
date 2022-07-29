import express from "express";
import managerController from "../controllers/managerController";
import passport from "passport";
import passportLocal from "passport-local";
import verifyUser from "../middleware/auth";



const rout = express.Router();

rout.post('/hotel',verifyUser,managerController.postHotel);
rout.post('/getimg',managerController.getimg);
rout.post('/uploadHotelIMG:id',verifyUser,managerController.postUploadHotelIMG);
rout.post('/rooms:id',verifyUser,managerController.postRooms);


export default rout;
