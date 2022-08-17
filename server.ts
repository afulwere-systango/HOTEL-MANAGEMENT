import express from 'express'
import "dotenv/config";
import connect from './DB/connect';
import bodyParser from 'body-parser';
import userRout from "./routes/userRoute";
import managerRout from "./routes/managerRoute";
import session from "express-session";
import passport from 'passport';
import passportInitialize from './config/passport';
import multer from 'multer';
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./swagger.json";



const multerVar=multer();
//initialize express 
const app = express();

//get data from post request and convert into json object(post data pars in json) 
app.use(bodyParser.json());
//pars the url encoded data
app.use(bodyParser.urlencoded({
    extended: true,
}));
app.use(multerVar.array("img"))
app.use(express.json())
//process is core module provide end variable access
const PORT = process.env.PORT;
//use->it is the middleware

app.use(session({
    //resave true :It means when the modification is performed on the session it will re write the req.session.cookie object.
    //resave false:It will not rewrite the req.session.cookie object. the initial req.session.cookie remains as it is.
    resave: false,
    //When an empty session object is created and no properties are set, it is the uninitialized state. So, setting saveUninitialized to false will not save the session if it is not modified.
    saveUninitialized: true,
    secret: `${process.env.SESSION_SECRET}`,
}));


passportInitialize(passport);
require('./config/passport')
// passport.session() acts as a middleware to alter the req object and change the 'user' value that is currently the session id (from the client cookie) into the true deserialized user object.
app.use(passport.initialize());
app.use(passport.session());

connect(`${process.env.DB_URL}`);
app.use('/user', userRout);
app.use('/manager', managerRout);

app.use('/api-docs', swaggerUi.serve,swaggerUi.setup(swaggerDocument));
app.listen(PORT, () => {
    console.log(`server listen at port ${PORT}`);
})


