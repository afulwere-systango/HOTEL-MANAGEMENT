import { string } from "joi";
import mongoose,{Schema,Document, ObjectId } from "mongoose";
import { ManagerSchemaHotel } from "./managerModel";



export interface User extends Document {
    firstName:String,
    lastName:String,
    userPhone:Number,
    userEmail:String,
    userPass:String,
    provider:String,
    googleID:String
}
const USER = new Schema<User>({
    firstName: {
      type: String,
      required: true,      
    },
    lastName: {
        type: String,
        required: true,      
      },
    userPhone: {
        type:Number,
      },
    userEmail: {
        type: String,
        required: true,      
      },
    userPass: {
        type: String,
      },
      provider: {
        type: String,
        required: true,      
      },
      googleID: {
        type: String,
      }
},{ collection: 'User' });


export interface RoomBook extends Document {
  userId:String,
  hotelId:ObjectId
  adults:Number,
  child:Number,
  AcRooms:Number,
  NonAcRooms:Number,
  fromDate:Date,
  toDate:Date,
  CurrentDate:Date,
  roomsPrice:Number,
  // checkOutDate:Date
}

const ROOM_BOOK_SCHEMA = new Schema<RoomBook>({
  userId: {
    type: String,
    required: true,      
  },
  hotelId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,      
  },
  adults: {
    type: Number,
    required: true,      
  },
  child: {
    type: Number,
    required: true,      
    
  },
  AcRooms: {
    type: Number,
    default:0,      
    required: true
  },
  NonAcRooms: {
    type: Number,
    default:0,
    required: true      
  },
  roomsPrice: {
    type: Number,
    default:0,
    required: true      
  },
  fromDate: {
    type: Date,
    required: true,      
  },
  toDate: {
    type: Date,
    required: true,      
  },
  checkOutDate: {
    type: Date
    // required: true,      
  },
  CurrentDate: {
    type: Date,
    required: true,      
  }

},{ collection: 'room-booking' });


const USERS = mongoose.model<User>('User',USER);
const roomBookingSchema = mongoose.model<RoomBook>('RoomBook',ROOM_BOOK_SCHEMA);

export {USERS,roomBookingSchema};