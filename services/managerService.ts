import { Request, Response } from 'express'
import request from 'request'
request.defaults({ encoding: null })
// .defaults({ encoding: null });
import fs from "fs";
import jwt from "jsonwebtoken";
import {ObjectID} from 'mongodb';

import { ManagerSchemaHotel, ManagerSchemaRooms, ManagerSchemaIMG } from '../models/managerModel';

class ManagerService {

    async createHotel(request: any, next: any) {
        try {
            // fs.createWriteStream('./text.jpeg').write(img);
            const bearerData = request.headers['authorization'];
            const bearer=bearerData.split(' ');
            const token =bearer[1]

            const decoded: any = jwt.verify(token, `${process.env.TOKEN_KEY}`);
            // console.log(decoded,'2222222222222222222');
            const userID = decoded.user_id;
            request.body.user_id = userID;
            let reqData = new ManagerSchemaHotel(request.body);
            await reqData.save();
            return reqData;
        } catch (err) {
            throw err;
        }
    }

    async createRooms(request: any, next: any) {
        try {
            const hotel_id = request.params.id;
            const bearerData = request.headers['authorization'];
            const bearer=bearerData.split(' ');
            const token =bearer[1]

            const decoded: any = jwt.verify(token, `${process.env.TOKEN_KEY}`);
            const userID = decoded.user_id;
            request.body.user_id = userID;
            const hotelData: any = await ManagerSchemaHotel.findOne({ _id: hotel_id });
            if (hotelData) {
                const hotelIDExist: any = await ManagerSchemaRooms.findOne({ hotel_id: hotel_id })
                if (hotelIDExist) {
                    return false;
                }
                request.body.hotel_id = new ObjectID(hotelData._id);
                console.log(typeof request.body.hotel_id,'0000000000000000000000');
                // console.log(typeof request.body._id,'0000000000000000000000');
                let reqData = new ManagerSchemaRooms(request.body);
                await reqData.save();
                return reqData;
            } else {
                return false;
            }
        }
        catch (err) {
            console.log(err);
            throw err;
        }
    }

    async getimg(request: Request, next: any) {
        const file: any = await ManagerSchemaHotel.findOne({ _id: "62e0ce1975d8fb14afa68e4e" });
        console.log(file.filePath);
        fs.writeFileSync("./text.jpeg", file.filePath);
        //     request.get(file.filePath, function (err:any) {
        //         //process exif here
        //         // res.send
        //   });
        // let buf:any = file.filePath
        // console.log(buf.toString('base64'));

        // this.toBase64(file.filePath);
        return "filedata";
    }

    async uploadIMG(request: any) {

        try {

            const hotel_id = request.params.id;
            const img: any = request.files;
            const incrUserID: any = request.session.passport.user;
            const decoded: any = jwt.verify(incrUserID, `${process.env.TOKEN_KEY}`);
            const userID = decoded.user_id;
            request.body.user_id = userID;


            const hotelData: any = await ManagerSchemaHotel.findOne({ _id: hotel_id });

            if (hotelData) {
                request.body.hotel_id = hotel_id;
                // console.log(request.body);    
                // console.log(request.body.user_id);

                let reqData;
                img.forEach(async (element: any) => {
                    // console.log(element.buffer);
                    request.body.img = element.buffer;
                    reqData = new ManagerSchemaIMG(request.body);
                    await reqData.save();
                });
                return reqData;
            } else {
                return false
            }
        }
        catch (err) {
            throw err
        }
    }





}
let managerService = new ManagerService();
export default managerService;
