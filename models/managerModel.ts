import mongoose, { Schema, Document, ObjectId } from "mongoose";

export interface Images extends Document {
  user_id: String,
  hotel_id:String,
  loboImg: Buffer
}
const HOTEL_IMAGES = new Schema<Images>({
  //hotel image
  
  user_id: {
    type: String,
    require: true,
  },
  hotel_id: {
    type: String,
    require: true,
  },
  loboImg: {
    type: Buffer,
    // require: true,
  },
  Images: {
      type: [
        { type:Buffer
          //  mongoose.Schema.Types.ObjectId, ref: 'hotel'
        // , required: true 
      },
      ],
      }

}, { collection: 'hotel-images' });

export interface Hotel extends Document {
  // hotel
  user_id: String,
  hotelName: String,
  location: String,
  rating: Number
  // filePath:Buffer
}

const HOTELS = new Schema<Hotel>({
  //hotel
  // filePath: {
  //   type: Buffer,
  //   require: true,
  // }
  // ,

  user_id: {
    type: String,
    require: true,
  },
  hotelName: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  }
  ,
  rating: {
    type: Number,
    required: true,
  }
}, { collection: 'hotel' });

export interface Rooms extends Document {
  // Rooms
  user_id: String,
  hotel_id:ObjectId,
  TotalRooms: Number,
  ACRooms: Number,
  NonACRooms: Number,
  ACRoomPrice: Number,
  NonACRoomPrice: Number
}

const HOTEL_ROOMS = new Schema<Rooms>({
  // room
  user_id: {
    type: String,
    require: true,
  },
  hotel_id:{
    type: mongoose.Schema.Types.ObjectId,
    require: true,   
  },
  TotalRooms: {
    type: Number,
    require: true,
  },
  ACRooms: {
    type: Number,
    required: true,
  },
  NonACRooms: {
    type: Number,
    required: true,
  },
  ACRoomPrice: {
    type: Number,
    required: true,
  },
  NonACRoomPrice: {
    type: Number,
    required: true,
  }
}, { collection: 'room' });

const HOTEL = mongoose.model<Hotel>('ManagerSchemaHotel', HOTELS);
const HOTEL_ROOM = mongoose.model<Rooms>('ManagerSchemaRooms', HOTEL_ROOMS);
const HOTEL_IMAGE = mongoose.model<Images>('ManagerSchemaIMG', HOTEL_IMAGES);
export { HOTEL, HOTEL_ROOM,HOTEL_IMAGE };