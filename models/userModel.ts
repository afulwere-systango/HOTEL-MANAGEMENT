import { string } from "joi";
import mongoose,{Schema,Document, ObjectId } from "mongoose";
import { HOTEL } from "./managerModel";



export interface Rating extends Document {
  userId:String,
  hotelId:String
  Cleanliness:Number,
  Staff:Number,
  Comfort:Number,
  Facilities:Number,
  Free_WiFi:Number,
  rating:Number,
  reviewMessages:String
}

const RATINGS = new Schema<Rating>({
    userId: {
    type: String,
    required: true,      
    },
    hotelId: {
      type: String,
      required: true,      
    },
    Cleanliness: {
      type:Number,
    },
    Staff: {
      type: Number,
    },
    Comfort: {
      type: Number,
    },
    Facilities: {
      type: Number,
    },
    Free_WiFi: {
      type: Number,
    },
    rating: {
      type: Number,
    },
    reviewMessages: {
      type:[
      {
        type: String,
      },],
    }
},{ collection: 'rating' });



export interface User extends Document {
    FirstName:String,
    LastName:String,
    Phone:Number,
    Email:String,
    Password:String,
    Role:String,
    Provider:String,
    GoogleID:String
}
const USER = new Schema<User>({
    FirstName: {
      type: String,
      required: true,      
    },
    LastName: {
        type: String,
        required: true,      
      },
    Phone: {
        type:Number,
      },
    Email: {
        type: String,
        required: true,      
      },
    Password: {
        type: String,
      },
    Role: {
        type: String,
      },
    Provider: {
        type: String,
        required: true,      
      },
    GoogleID: {
        type: String,
      }
},{ collection: 'User' });


export interface Booking extends Document {
  //Bookings
  userId:String,
  hotelId:ObjectId
  Adults:Number,
  Child:Number,
  AcRooms:Number,
  NonAcRooms:Number,
  FromDate:Date,
  ToDate:Date,
  CurrentDate:Date,
  roomsPrice:Number,
  // checkOutDate:Date
}

const ROOM_BOOKING= new Schema<Booking>({
  userId: {
    type: String,
    required: true,      
  },

  hotelId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,      
  },
  Adults: {
    type: Number,
    required: true,      
  },
  Child: {
    type: Number,
    required: true,      
    
  },
  AcRooms: {
    type: Number,
    default:0,      
    // required: true
  },
  NonAcRooms: {
    type: Number,
    default:0,
    // required: true      
  },
  roomsPrice: {
    type: Number,
    default:0,
    required: true      
  },
  FromDate: {
    type: Date,
    required: true,      
  },
  ToDate: {
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
const BOOKING = mongoose.model<Booking>('RoomBook',ROOM_BOOKING);
const RATING = mongoose.model<Rating>('Rating',RATINGS);

export {USERS,BOOKING,RATING};