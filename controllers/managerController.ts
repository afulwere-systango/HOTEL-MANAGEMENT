import  { Request, Response } from "express";
import managerService from "../services/managerService";

class ManagerController{

    async  postPhaseOne(request:Request,response:Response,next:any){

            try {                
                const DATA = await managerService.postPhaseOne(request,next);            
                console.log('hotel phase one complied ....',DATA);
                response.json({msg:'hotel phase one complied...'})
            } catch (error) {
                console.log('error in managerController.ts');
                response.json({msg:{error}});
            }

    }
    async  postPhaseTwo(request:Request,response:Response,next:any){

            try {                
                const DATA = await managerService.postPhaseTwo(request,next);            
                console.log('hotel phase two complied ....',DATA);
                response.json({msg:'hotel phase two complied...'})
            } catch (error) {
                console.log('error in managerController.ts');
                response.json({msg:{error}});
            }

    }
}

let managerController=new ManagerController();
export default managerController;
