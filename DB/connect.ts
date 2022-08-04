import mongoose from 'mongoose';

export default (db:string)=>{

 mongoose.connect(db,{
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  },()=>{
    console.log('connected to database....')
  }
);
}