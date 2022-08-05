import mongoose, { Schema, Document, ObjectId } from "mongoose";

export interface ManagerIMG extends Document {
  user_id: String,
  hotel_id:String,
  loboImg: Buffer
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

export interface ManagerHotel extends Document {
  user_id: String,
  hotelName: String,
  location: String,
  rating: Number
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
  ,
  rating: {
    type: Number,
    required: true,
  }
}, { collection: 'hotel' });

export interface ManagerRooms extends Document {
  user_id: String,
  hotel_id:ObjectId,
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