import express from "express";
import managerController from "../controllers/managerController";
import passport from "passport";
import passportLocal from "passport-local";
import verifyUser from "../middleware/auth";



const rout = express.Router();

rout.post('/phase_one',verifyUser,managerController.postPhaseOne);
rout.post('/phase_two',verifyUser,managerController.postPhaseTwo);

export default rout;
