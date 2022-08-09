import express from "express";
import managerController from "../controllers/managerController";
import {verifyUser} from "../middleware/auth";
import validation from "../middleware/validation";

const route = express.Router();

//create hotel by service provider
route.post('/create-hotel',validation.hotelCreateValidation,verifyUser,managerController.createHotel);
//upload specific hotel rooms by hotel id 
route.post('/create-rooms/:id',validation.roomCreateValidation,verifyUser,managerController.createRooms);
//upload specific hotel lobo image by hotel id
route.post('/upload-IMG/logo/:id',verifyUser,managerController.uploadLogoImage);
//upload multiple hotel images by hotel id
route.post('/upload-IMG/images/:id',verifyUser,managerController.uploadImages);

route.post('/getimg',managerController.getimg);

export default route;
