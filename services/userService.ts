import { Request, Response } from 'express'
import { USERS, BOOKING } from '../models/userModel';
import { HOTEL, HOTEL_ROOM, HOTEL_IMAGE } from '../models/managerModel';
import bcrypt from "bcrypt";
import TextResponse from "../constants/TextResponse";

class UserService {

    async create(request: Request) {
        try {

            request.body.Provider = 'local'
            const newUser = new USERS(request.body);
            const newPassword:any= request.body.Password;
            const userExist = await USERS.findOne({ Email: newUser.Email });
            if (userExist) {
                return TextResponse.USER_ALREADY_EXIST;
            }
            const hashPass = await bcrypt.hash(newPassword, 10);
            newUser.Password = hashPass;
            await newUser.save();
            return newUser;
        }
        catch (err) {
            console.log(err, '(userService.ts)');
            throw err;

        }
    }
    async search(request: any) {
        try {
            const paramLocation = request.query.location;
            const paramRating = +request.query.rating;
            return HOTEL.aggregate([
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
    async getUser(request: Request) {
        try {
            let userData: any = request.user;
            return userData;
            console.log('user details successfully get.');
        } catch (err) {
            throw err
        }
    }
    async getHotelDetails(request: any) {
        try {
            const hotelId = request.params.hotelId;

            const hotelData: any = await HOTEL.findOne({ _id: hotelId })
            const roomData: any = await HOTEL_ROOM.findOne({ hotel_id: hotelId })
            const imageData: any = await HOTEL_IMAGE.findOne({ hotel_id: hotelId })
            // console.log(imageData);

            const ALL_DATA: any = { hotelData, roomData, imageData };
            // const { hotelName, location, rating }:any = hotelData;
            // const { TotalRooms, ACRooms, NonACRooms, ACRoomPrice, NonACRoomPrice } = roomData;
            // const  {loboImg,Images} :any  = imageData;
            // console.log(loboImg,Images);

            // DATA = {
            //     "hotel name ": hotelName,
            //     "location": location,
            //     "Rating": rating,
            //     "Total Rooms": TotalRooms,
            //     "AC Rooms": ACRooms,
            //     "Non AC Rooms": NonACRooms,
            //     "AC Room Price": ACRoomPrice,
            //     "Non Ac Room Price": NonACRoomPrice,
            //     "lobo image":loboImg
            //     // loboImg, Images
            // }

            return ALL_DATA;


            // // console.log(hotelData);
            // // console.log(roomData);
            // // console.log(imageData);
            // const data :any=[...hotelData];



        } catch (err) {
            throw err
        }
    }
    async update(request: any, response: Response) {
        try {
            // const newUserData = UserSchema();
            await USERS.updateOne({ _id: "62e26a09bcb872226a486a31" },
                {
                    $push: { userArray: request.body.userArray }
                })
        } catch (err) {

            // next(err);
            console.log(err);

        }
    }
    async booking(request: any) {
        try {

            const hotelId = request.params.hotelId;
            const userData = request.user
            const fromDate = new Date(request.body.FromDate)
            const toDate = new Date(request.body.ToDate)
            const CurrentDate = new Date();

            request.body.userId = userData._id;
            request.body.FromDate = fromDate;
            request.body.ToDate = toDate;
            request.body.CurrentDate = CurrentDate;
            request.body.hotelId = hotelId;

            // console.log(toDate.getDate() - fromDate.getDate() + 1);

            const hotelRoomsData = await HOTEL_ROOM.findOne({ hotel_id: hotelId })
            if (!hotelRoomsData) {
                return 'hotel not found..'
            }
            let AcRoomPrice = Number(hotelRoomsData.ACRoomPrice) * Number(request.body.AcRooms);
            let NonAcRoomPrice = Number(hotelRoomsData.NonACRoomPrice) * Number(request.body.NonAcRooms);
            let roomsPrice = AcRoomPrice + NonAcRoomPrice;

            request.body.roomsPrice = roomsPrice;
            const newUserData = new BOOKING(request.body);
            newUserData.save()
            if (Number(hotelRoomsData.ACRooms) > 0 && Number(hotelRoomsData.NonACRooms) > 0) {
                let availableAcRooms = Number(hotelRoomsData.ACRooms) - Number(request.body.AcRooms)
                let availableNonAcRooms = Number(hotelRoomsData.NonACRooms) - Number(request.body.NonAcRooms)
                await HOTEL_ROOM.updateOne({ hotel_id: hotelId },
                    {
                        $set: {
                            ACRooms: availableAcRooms,
                            NonACRooms: availableNonAcRooms
                        }
                    }
                )
                return newUserData;
            }
            return 'rooms are not available right now...'
        } catch (error) {
            throw error;
        }
    }
    async checkOut(request: any) {
        try {
            const roomId = request.params.roomId;
            const checkOutDate = new Date(request.body.checkOutDate);
            await BOOKING.updateOne({ _id: roomId },
                {
                    $set: { checkOutDate: checkOutDate }

                })
            return 'Checkout Success !';
        }
        catch (err) {
            throw err;
        }
    }
}

let userService = new UserService();
export default userService;