import { Request, Response } from 'express'
import { USERS, BOOKING, RATING } from '../models/userModel';
import { HOTEL, HOTEL_ROOM, HOTEL_IMAGE } from '../models/managerModel';
import bcrypt from "bcrypt";
import TextResponse from "../constants/TextResponse";

class UserService {

    async create(request: Request) {
        try {

            request.body.Provider = 'local'
            const newUser = new USERS(request.body);
            const newPassword: any = request.body.Password;
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
            throw err;
        }
    }
    async search(request: any) {
        try {
            const paramLocation = request.query.location;
            const paramRating = +request.query.rating;
            console.log(paramRating);
            
            return HOTEL.aggregate([
                
                {
                    $match: {
                        $text: { $search: paramLocation || "indore", $diacriticSensitive: true }, rating: {$lte: paramRating} || { $lte: 5 }
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
            console.log('user details successfully get.');
            return userData;
        } catch (err) {
            throw err
        }
    }
    async getHotelDetails(request: any) {
        try {
            const hotelId = request.params.hotelId;

            const hotelData: any = await HOTEL.findOne({ _id: hotelId })
            if(!hotelData){
                return "Hotel Not Found.    "
            }
            const ratings:any=await RATING.aggregate(
                        [   
                    
                    {
                        $match:{"hotelId":hotelId}
                    },
                    {
                        
                        $group:{
                            _id: "$hotelId",
                            avgCleanliness: { $avg: "$Cleanliness"},
                            avgStaff: { $avg: "$Staff"},
                            avgComfort: { $avg: "$Comfort"},
                            avgFacilities: { $avg: "$Facilities"},
                            avgFree_WiFi: { $avg: "$Free_WiFi"},                           
                            reviewMessages:{$push:"$reviewMessages"}
                        }
                    }
                        ]
                )
            const roomData: any = await HOTEL_ROOM.findOne({ hotel_id: hotelId })
            const imageData: any = await HOTEL_IMAGE.findOne({ hotel_id: hotelId })
            const ALL_DATA: any = { hotelData, ratings,roomData,imageData };
            return ALL_DATA;
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
            return 'Rooms are not available right now...'
        } catch (error) {
            throw error;
        }
    }
    async checkOut(request: any) {
        try {
            const bookingRoomId = request.params.roomId;
            let bookingData: any = await BOOKING.findOne({ _id: bookingRoomId })
            const hotelRoomsData: any = await HOTEL_ROOM.findOne({ hotel_id: bookingData.hotelId })

            const checkOutDate = new Date(request.body.checkOutDate);
            const toDate = bookingData.ToDate.getDate();

            if (bookingData.checkOutDate) {
                return `Already Checked Out! Rooms Price : ${bookingData.roomsPrice} `
            }

            if (checkOutDate.getDate() > toDate) {
                const extraDay = checkOutDate.getDate() - toDate;
                const AcRoomPrice: any = Number(hotelRoomsData.ACRoomPrice) * Number(bookingData.AcRooms) * (extraDay);
                const NonAcRoomPrice: any = Number(hotelRoomsData.NonACRoomPrice) * Number(bookingData.NonAcRooms) * (extraDay);
                const extraRoomPrice = AcRoomPrice + NonAcRoomPrice;
                console.log(extraRoomPrice);
                console.log(bookingData.roomsPrice);
                await BOOKING.updateOne({ _id: bookingRoomId },
                    {
                        $set: { roomsPrice: extraRoomPrice + bookingData.roomsPrice }

                    })


            }
            await HOTEL_ROOM.updateOne({ hotel_id: bookingData.hotelId },
                {
                    $set: { ACRooms: hotelRoomsData.ACRooms + bookingData.AcRooms, NonACRooms: hotelRoomsData.NonACRooms + bookingData.NonAcRooms }
                })
            bookingData = await BOOKING.findOne({ _id: bookingRoomId });
            await BOOKING.updateOne({ _id: bookingRoomId },
                {
                    $set: { checkOutDate: checkOutDate }

                })
            return `Checkout Success ! Rooms Price : ${bookingData.roomsPrice}`;
        }
        catch (err) {
            throw err;
        }
    }
    async rating(request: any) {
        const hotelId = request.params.hotelId;
        const userData = request.user;
        const cleanliness = request.body.Cleanliness;
        const staff = request.body.Staff;
        const comfort = request.body.Comfort;
        const facilities = request.body.Facilities;
        const freeWiFi = request.body.Free_WiFi;
        const rating = Math.round((cleanliness + staff + comfort + facilities + freeWiFi) / 5);

        request.body.hotelId = hotelId;
        request.body.userId = userData._id;
        request.body.rating = rating;
        
        const user= await RATING.findOne({hotelId: hotelId,userId:userData._id})
        if(user){
            return `Rating already given by you. Rating :${user.rating}`
        }                
        const ratingData = new RATING(request.body);
        await ratingData.save();
        const allRatings = await RATING.find({ hotelId: hotelId }, { rating: 1, _id: 0 })
        let totalRating:any=0;
        allRatings.map(({ rating }) => totalRating += rating)
        const averageRating = totalRating / allRatings.length
        await HOTEL.updateOne({ _id: hotelId },
            {
                $set: { rating: averageRating }
            })
        return ratingData;

    }
    async review(request:any){
        const hotelId = request.params.hotelId;
        const userData = request.user;
        const message = request.body.message;
        const ratingData=await RATING.findOne({ hotelId: hotelId,userId:userData._id });
        if(!ratingData){
                return "Hotel not found !"
            }
            await RATING.updateOne({ hotelId: hotelId,userId:userData._id },
            {
                $push: {
                    reviewMessages:  message 
                }
            }
        )
        return "Review Added successfully !";
    }

}

let userService = new UserService();
export default userService;