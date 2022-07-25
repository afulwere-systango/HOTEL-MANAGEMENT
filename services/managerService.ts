import { Request, Response } from 'express'
import jwt from "jsonwebtoken";
import {ManagerSchemaPhaseOne,ManagerSchemaPhaseTwo} from '../models/managerModel';

class ManagerService{

    async postPhaseOne(request :any,next:any){
        console.log(request.body,'11111111111111');
        const incrUserID:any=request.session.passport.user;
        const decoded :any= jwt.verify(incrUserID, `${process.env.TOKEN_KEY}`);
        console.log(decoded.user_id);
        const userID=decoded.user_id;
        request.body.user_id=userID;
        console.log(request.body,'222222222222222');
        
        let reqData=new ManagerSchemaPhaseOne(request.body);
        await reqData.save();
        return reqData;
    }   

    async postPhaseTwo(request :any,next:any){
        console.log(request.body,'11111111111111');
        // const incrUserID:any=request.session.passport.user;
        // const decoded :any= jwt.verify(incrUserID, `${process.env.TOKEN_KEY}`);
        // console.log(decoded.user_id);
        // const userID=decoded.user_id;

        // request.body.user_id=userID;
        console.log(request.body,'222222222222222');        
        let reqData=new ManagerSchemaPhaseTwo(request.body);
        await reqData.save();
        return reqData;
    }   

}
let managerService = new ManagerService();
export default managerService;


// "userEmail":"chetan@1234",
// "userPass":"1234"
