import { Request, Response } from 'express'
import { UserSchema, roomBookingSchema } from '../models/userModel';
import { ManagerSchemaHotel, ManagerSchemaRooms, ManagerSchemaIMG } from '../models/managerModel';
import bcrypt from "bcrypt";
import { getUserID } from "../middleware/auth";

import passport from 'passport';
import { sign } from 'jsonwebtoken'
class UserService {
    async getUser(request: Request, next: any) {
        try {
            let id = request.params.id;
            const user = await UserSchema.findOne({ _id: id });
            return user;
        } catch (err) {
            next(err);
        }
    }

    async create(request: Request, next: any) {
        try {

            request.body.provider = 'local'
            const newUserData = new UserSchema(request.body);
            const newUserPass = request.body.userPass;
            const userExist = await UserSchema.findOne({ userEmail: newUserData.userEmail });

            if (!userExist) {
                const hashPass = await bcrypt.hash(newUserPass, 10);
                newUserData.userPass = hashPass;
                await newUserData.save();
                return newUserData;
            }
            else {
                return false;
            }
        }
        catch (err) {
            console.log(err, '(userService.ts 11111111111111111)');
            throw err;
        }
    }


    async login(request: any) {
        try {
            console.log(request.query.location);
            console.log(request.query.rating);
            const paramLocation = request.query.location;
            const paramRating = +request.query.rating;
            return ManagerSchemaHotel.aggregate([

                {
                    $match: {
                        $text: { $search: paramLocation || "indore", $diacriticSensitive: true }, rating: paramRating || { $lte: 5 }
                    }
                },
                {
                    $lookup:
                    {
                        from: "room",
                        localField: "_id",
                        foreignField: "hotel_id",
                        as: "fromRoom"
                    }
                },
                {
                    $replaceRoot: { newRoot: { $mergeObjects: [{ $arrayElemAt: ["$fromRoom", 0] }, "$$ROOT"] } }
                },
                {
                    $project: {
                        fromRoom: 0,
                    }
                },
            ]);
        }
        catch (err) {
            throw err;
        }
    }

    async update(request: any, response: Response) {
        try {
            // const newUserData = UserSchema();
            await UserSchema.updateOne({ _id: "62e26a09bcb872226a486a31" },
                {
                    $push: { userArray: request.body.userArray }
                })
        } catch (err) {

            // next(err);
            console.log(err);

        }
    }
    async roomBooking(request: any) {
        try {

            // console.log(request.params.hotelId);
            const hotelId = request.params.hotelId;
            const bearerData = request.headers['authorization'];
            const userId = await getUserID(bearerData)
            request.body.userId = userId;
            console.log(request.body.CheckInDate);

            const fromDate = new Date(request.body.fromDate)
            const toDate = new Date(request.body.toDate)
            const CurrentDate = new Date();
            
            console.log(toDate.getDate()-fromDate.getDate()+1);
            // console.log(CheckOutDate);
            // console.log(CurrentDate);
            
            request.body.CheckInDate=fromDate;
            request.body.CheckOutDate=toDate;
            request.body.CurrentDate=CurrentDate;
            request.body.hotelId=hotelId;


            const roomsData = await ManagerSchemaRooms.findOne({ hotel_id: hotelId })
            // console.log(roomsData);
            if (roomsData) {
                let AcRoomPrice = Number(roomsData.ACRoomPrice) * Number(request.body.AcRooms);
                let NonAcRoomPrice = Number(roomsData.NonACRoomPrice) * Number(request.body.NonAcRooms);
                // console.log(AC_ROOM_PRICE);
                // console.log(NON_AC_ROOM_PRICE);
                let roomsPrice = AcRoomPrice + NonAcRoomPrice;
                request.body.roomsPrice = roomsPrice;
                const newUserData = new roomBookingSchema(request.body);
                newUserData.save()
            if(Number(roomsData.ACRooms)>0 && Number(roomsData.NonACRooms)>0 ){
                let availableAcRooms = Number(roomsData.ACRooms) - Number(request.body.AcRooms)
                let availableNonAcRooms = Number(roomsData.NonACRooms) - Number(request.body.NonAcRooms)
                console.log(availableAcRooms);
                console.log(availableNonAcRooms);

                await ManagerSchemaRooms.updateOne({ hotel_id: hotelId },
                    {
                         $set: {
                            ACRooms : availableAcRooms,
                            NonACRooms:availableNonAcRooms
                        }
                }
                )

                return newUserData;
            }
               return 'rooms are not available right now...' 
            }
            return 'rooms not available....'

        } catch (error) {
            throw error;
        }
    }
    async checkOut(request:any){

        try{
        console.log(request.query.userId);
        const userId=request.query.userId
        const checkOutDate=new Date();
        console.log(checkOutDate);
        console.log(userId);
        
        await roomBookingSchema.updateOne({ _id: userId },
                {
                    $set:{ checkOutDate: checkOutDate }
                    
                })
        return 'checkout';
            }
        catch(err){
            throw err;
        }
    }
}

let userService = new UserService();
export default userService;