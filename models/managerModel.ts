import mongoose,{Schema,Document } from "mongoose";

export interface ManagerPhaseOne extends Document {
    user_id:String,
    hotelName:String,
    location:String,
    images:String,
}

const MANAGER_SCHEMA_PHASE_ONE = new Schema<ManagerPhaseOne>({
    user_id:{
        type:String,
        require:true,
    },
    hotelName: {
      type: String,
      required: true,      
    },
    location: {
        type: String,
        required: true,      
      },
    images: {
        type:String,
        required: true,      
      }
},{ collection: 'hotel-phase-one' });

export interface ManagerPhaseTwo extends Document {
    TotalRooms:Number,
    ACRooms:Number,
    NonACRooms:Number,
    RoomPrice:Number
}

const MANAGER_SCHEMA_PHASE_TWO = new Schema<ManagerPhaseTwo>({
    TotalRooms:{
        type:Number,
        require:true,
    },
    ACRooms: {
      type: Number,
      required: true,      
    },
    NonACRooms: {
        type: Number,
        required: true,      
      },
      RoomPrice: {
        type:Number,
        required: true,      
      }
},{ collection: 'hotel-phase-two' });

const ManagerSchemaPhaseOne= mongoose.model<ManagerPhaseOne>('ManagerSchemaPhaseOne',MANAGER_SCHEMA_PHASE_ONE);
const ManagerSchemaPhaseTwo= mongoose.model<ManagerPhaseTwo>('ManagerSchemaPhaseTwo',MANAGER_SCHEMA_PHASE_TWO);
export {ManagerSchemaPhaseOne,ManagerSchemaPhaseTwo};