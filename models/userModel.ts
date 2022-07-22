import mongoose,{Schema,Document } from "mongoose";

export interface User extends Document {
    firstName:String,
    lastName:String,
    userPhone:Number,
    userEmail:String,
    userPass:String
}

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
      }
},{ collection: 'User' });

export default mongoose.model<User>('UserSchema',USER_SCHEMA);