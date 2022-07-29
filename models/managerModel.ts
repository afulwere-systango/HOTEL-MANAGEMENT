import mongoose, { Schema, Document } from "mongoose";

export interface ManagerIMG extends Document {
  user_id: String,
  hotel_id:String,
  img: Buffer
}

const MANAGER_SCHEMA_IMG = new Schema<ManagerIMG>({
  user_id: {
    type: String,
    require: true,
  },
  hotel_id: {
    type: String,
    require: true,
  },
  img: {
    type: Buffer,
    require: true,
  }
}, { collection: 'hotel-images' });

export interface ManagerHotel extends Document {
  user_id: String,
  hotelName: String,
  location: String,
  // images: String,
  // filePath:Buffer
}

const MANAGER_SCHEMA_HOTEL = new Schema<ManagerHotel>({
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
  // ,
  // images: {
  //   type: String,
  //   required: true,
  // }
}, { collection: 'hotel' });

export interface ManagerRooms extends Document {
  user_id: String,
  hotel_id:String,
  TotalRooms: Number,
  ACRooms: Number,
  NonACRooms: Number,
  ACRoomPrice: Number,
  NonACRoomPrice: Number
}

const MANAGER_SCHEMA_ROOMS = new Schema<ManagerRooms>({
  user_id: {
    type: String,
    require: true,
  },
  hotel_id:{
    type: String,
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

// export interface myarr extends Document{

//   fno:Number,
//   sno:Number,
//   tno:Number,

// }

// const Myarr = new Schema<myarr>({
//   fno: {
//     type: Number,
//     required: true,      
//   },
//   sno: {
//     type: Number,
//     required: true,      
//   },
//   tno: {
//     type: Number,
//     required: true,      
//   }
// })

// mongoose.model<User>('Myarr',Myarr)



const ManagerSchemaHotel = mongoose.model<ManagerHotel>('ManagerSchemaHotel', MANAGER_SCHEMA_HOTEL);
const ManagerSchemaRooms = mongoose.model<ManagerRooms>('ManagerSchemaRooms', MANAGER_SCHEMA_ROOMS);
const ManagerSchemaIMG = mongoose.model<ManagerIMG>('ManagerSchemaIMG', MANAGER_SCHEMA_IMG);
export { ManagerSchemaHotel, ManagerSchemaRooms,ManagerSchemaIMG };