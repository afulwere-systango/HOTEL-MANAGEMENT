import express from 'express'
import "dotenv/config";
import connect from './DB/connect';
import bodyParser from 'body-parser';
import userRout from "./routes/userRoute";
import session from "express-session";
import passport from 'passport';
import flash from 'express-flash';
import initializePass from './config/passport';
import  jwt  from "jsonwebtoken";

const app =express();
app.use(bodyParser.json());
const PORT=process.env.PORT;



app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: `${process.env.SESSION_SECRET}`,
}));


initializePass(passport);
app.use(passport.initialize());
app.use(passport.session());
// app.use(jwt.session());

app.use(flash());
connect(`${process.env.DB_URL}`); 
app.use('/user',userRout);


app.listen(PORT,()=>{
    console.log(`server start at port ${PORT}`);
})


