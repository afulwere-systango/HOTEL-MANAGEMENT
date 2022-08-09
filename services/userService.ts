import { Request, Response } from 'express'
import { USERS, roomBookingSchema } from '../models/userModel';
import { ManagerSchemaHotel, ManagerSchemaRooms, ManagerSchemaIMG } from '../models/managerModel';
import bcrypt from "bcrypt";
class UserService {

    async create(request: Request) {
        try {

            request.body.provider = 'local'
            const newUserData = new USERS(request.body);
            const newUserPass = request.body.userPass;
            const userExist = await USERS.findOne({ userEmail: newUserData.userEmail });
            if (userExist) {
                return 'USER ALREADY EXIST.';
            }
            const hashPass = await bcrypt.hash(newUserPass, 10);
            newUserData.userPass = hashPass;
            await newUserData.save();
            return newUserData;
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

            const hotelData: any = await ManagerSchemaHotel.findOne({ _id: hotelId })
            const roomData: any = await ManagerSchemaRooms.findOne({ hotel_id: hotelId })
            const imageData: any = await ManagerSchemaIMG.findOne({ hotel_id: hotelId })
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
    async roomBooking(request: any) {
        try {

            const hotelId = request.params.hotelId;
            const userData = request.user
            const fromDate = new Date(request.body.fromDate)
            const toDate = new Date(request.body.toDate)
            const CurrentDate = new Date();

            request.body.userId = userData._id;
            request.body.CheckInDate = fromDate;
            request.body.CheckOutDate = toDate;
            request.body.CurrentDate = CurrentDate;
            request.body.hotelId = hotelId;

            // console.log(toDate.getDate() - fromDate.getDate() + 1);

            const hotelRoomsData = await ManagerSchemaRooms.findOne({ hotel_id: hotelId })
            if (!hotelRoomsData) {
                return 'hotel not found..'
            }
            let AcRoomPrice = Number(hotelRoomsData.ACRoomPrice) * Number(request.body.AcRooms);
            let NonAcRoomPrice = Number(hotelRoomsData.NonACRoomPrice) * Number(request.body.NonAcRooms);
            let roomsPrice = AcRoomPrice + NonAcRoomPrice;
            request.body.roomsPrice = roomsPrice;
            const newUserData = new roomBookingSchema(request.body);
            newUserData.save()
            if (Number(hotelRoomsData.ACRooms) > 0 && Number(hotelRoomsData.NonACRooms) > 0) {
                let availableAcRooms = Number(hotelRoomsData.ACRooms) - Number(request.body.AcRooms)
                let availableNonAcRooms = Number(hotelRoomsData.NonACRooms) - Number(request.body.NonAcRooms)
                await ManagerSchemaRooms.updateOne({ hotel_id: hotelId },
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

            const userRoomId = request.query.userRoomId
            const checkOutDate = new Date(request.body.checkOutDate);

            return new Promise(async (resolve: any, reject: any) => {

                await roomBookingSchema.updateOne({ _id: userRoomId },
                    {
                        $set: { checkOutDate: checkOutDate }

                    }).then(() => {
                        resolve('checkout success')
                    }).catch((err) => {
                        reject('checkout fail')
                    })
            })
            // await roomBookingSchema.updateOne({ _id: userRoomId },
            //     {
            //         $set: { checkOutDate: checkOutDate }

            //     }).then(()=>{
            //         return 'checkout success'
            //     })
            // console.log(data.n);
            // if (!data.n) {
            //     return 'booking room not found'
            // }
        }
        catch (err) {
            throw err;
        }
    }
}

let userService = new UserService();
export default userService;