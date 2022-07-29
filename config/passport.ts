import passport from "passport";
import passportLocal, { Strategy } from "passport-local";
import UserSchema from '../models/userModel';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// const LocalStrategy = passportLocal.Strategy;


// const initializePass = (passport:any) => {


const validatePassword = (password: any, user: any) => {

    return bcrypt.compareSync(password, user.userPass);
}
passport.use('local', new Strategy({
    usernameField: 'userEmail',
    passwordField: 'userPass',
}, (email: any, password: any, done: any) => {
    console.log(email, password);
    console.log('1111111111111111111111111');
    
    UserSchema.findOne({ userEmail: email })
        .then((user) => {
            if (!user) {
                return done(null, 'Incorrect email.');
            }
            if (!user || !validatePassword(password, user)) {
                return done(null, 'Incorrect password.');
            } else {
                return done(null, user);
            }

        }).catch((err) => {
            done(null, err.message);
        });
}));

// }
//use for authentication done
passport.serializeUser((user: any, done: any) => {
    done(null, user);
    console.log('serialize');

});
//use for retrieve user data from session
passport.deserializeUser((user: any, done: any) => {
    console.log('de serialize');

    done(null, user);
});