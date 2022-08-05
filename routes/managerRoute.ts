import express from "express";
import managerController from "../controllers/managerController";
import {verifyUser} from "../middleware/auth";
import passport from "passport";
const route = express.Router();

route.post('/create-hotel',verifyUser,managerController.createHotel);
route.post('/getimg',managerController.getimg);
route.post('/upload-IMG/logo/:id',verifyUser,managerController.uploadLogoImage);
route.post('/upload-IMG/images/:id',verifyUser,managerController.uploadImages);
route.post('/create-rooms/:id',verifyUser,managerController.createRooms);

export default route;
