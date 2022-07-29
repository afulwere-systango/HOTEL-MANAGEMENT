import { string } from "joi";
import mongoose,{Schema,Document } from "mongoose";
import { ManagerSchemaHotel } from "./managerModel";



export interface User extends Document {
    firstName:String,
    lastName:String,
    userPhone:Number,
    userEmail:String,
    userPass:String
}

// let myarr = [String,Number]


const USER_SCHEMA = new Schema<User>({
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
        required: true,      
      },
    userEmail: {
        type: String,
        required: true,      
      },
    userPass: {

        type: String,
        required: true,      
      },
    // userArray: {
    //   type: [
    //     { type: mongoose.Schema.Types.ObjectId, ref: 'hotel', required: true },
    //   ],
    //   }
},{ collection: 'User' });

export default mongoose.model<User>('UserSchema',USER_SCHEMA);