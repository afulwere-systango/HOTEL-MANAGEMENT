import { Request, Response } from 'express'
import request from 'request'
request.defaults({ encoding: null })
// .defaults({ encoding: null });
import fs from "fs";
import jwt from "jsonwebtoken";
import { ObjectID } from 'mongodb';

import { ManagerSchemaHotel, ManagerSchemaRooms, ManagerSchemaIMG } from '../models/managerModel';

class ManagerService {

    async createHotel(request: Request, next: any) {
        try {
            // fs.createWriteStream('./text.jpeg').write(img);
            const userData: any = request.user;
            request.body.user_id = userData._id;
            let hotelData = new ManagerSchemaHotel(request.body);
            await hotelData.save();
            return hotelData;
        } catch (err) {
            throw err;
        }
    }

    async createRooms(request: any, next: any) {
        try {
            const hotelId = request.params.id;
            const userData: any = request.user;
            request.body.user_id = userData._id;
            const hotelData: any = await ManagerSchemaHotel.findOne({ _id: hotelId });
            if (!hotelData) {
                return 'hotel data not found'
            }
            const hotelIDExist: any = await ManagerSchemaRooms.findOne({ hotel_id: hotelId })
            if (hotelIDExist) {
                return 'room already inserted';
            }
            request.body.hotel_id = new ObjectID(hotelData._id);
            let reqData = new ManagerSchemaRooms(request.body);
            await reqData.save();
            return reqData;
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

    async uploadLogoImage(request: any) {

        try {

            const hotelId = request.params.id;
            const img: any = request.files;
            const userData = request.user;

            request.body.user_id = userData._id;
            const hotelData: any = await ManagerSchemaHotel.findOne({ _id: hotelId });
            if (!hotelData) {
                return 'first fill hotel details.....'
            }
            request.body.hotel_id = hotelId;
            let reqData;
            const ImgData = await ManagerSchemaIMG.findOne({ hotel_id: hotelId })
            if (ImgData?.loboImg) {
                return 'logo uploaded already .....';
            }
            request.body.loboImg = img[0].buffer;
            reqData = new ManagerSchemaIMG(request.body);
            await reqData.save();
            return reqData;
        }
        catch (err) {
            throw err
        }
    }


    async uploadImages(request: any) {

        const hotel_id = request.params.id;


        const img: any = request.files;
        const bearerData = request.headers['authorization'];
        const bearer = bearerData.split(' ');
        const token = bearer[1]
        const decoded: any = jwt.verify(token, `${process.env.TOKEN_KEY}`);
        const userID = decoded.user_id;
        request.body.user_id = userID;

        const hotelData: any = await ManagerSchemaHotel.findOne({ _id: hotel_id });
        if (hotelData) {

            // console.log(img);
            let imagesArray: any = [];
            img.forEach(async (element: any) => {
                imagesArray.push(element.buffer)
                //     await ManagerSchemaIMG.updateOne({ hotel_id: hotel_id },
                //         {
                //             $push : {
                //                 Images:element.buffer
                //             }
                //         }
            })
            // console.log(imagesArray);

            await ManagerSchemaIMG.updateOne({ hotel_id: hotel_id },
                {

                    $push: {
                        Images: {
                            $each: imagesArray
                        }
                    }
                }
            )
            return 'done'

        } else {
            return "first fill hotel details.....";
        }
    }






}
let managerService = new ManagerService();
export default managerService;
