import passport from "passport";
import passportLocal from "passport-local";
import UserSchema from '../models/userModel';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
// const GoogleStrategy = require("passport-google-oauth2").Strategy;
import passportGoogle from "passport-google-oauth2";
// const LocalStrategy = passportLocal.Strategy;
// const GoogleStrategy=new google.Strategy();

// const initializePass = (passport:any) => {

passport.serializeUser((user: any, done: any) => {
    done(null, user);
    console.log('serialize');

});
//use for retrieve user data from session
passport.deserializeUser((user: any, done: any) => {
    console.log('de serialize');

    done(null, user);
});
const validatePassword = (password: any, user: any) => {

    return bcrypt.compareSync(password, user.userPass);
}

function Intialize(passport: any) {
    let localStrategy = passportLocal.Strategy
    passport.use('local', new localStrategy({
        usernameField: 'userEmail',
        passwordField: 'userPass',
    }, async (email: any, password: any, done: any) => {
        console.log(email, password);
        console.log('1111111111111111111111111');
        let user = await UserSchema.findOne({ userEmail: email }).exec()
        console.log(user)
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

    const clientId = '503353417663-8igaceoalk9n23gsohv3chjih06viick.apps.googleusercontent.com';
    const clientSecret = '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';
    let googleStrategy = passportGoogle.Strategy
    passport.use('google', new googleStrategy({
        clientID: process.env.CLIENT_ID || clientId,
        clientSecret: process.env.CLIENT_SECRET || clientSecret,
        callbackURL: "http://localhost:3000/user/auth/google/callback",
        passReqToCallback: true
    },
        async function (request: any, accessToken: any, refreshToken: any, profile: any, done: any) {
            // console.log(profile);
            let existingUser = await UserSchema.findOne({ googleID: profile.id });
            if (existingUser) {
                return done(null,accessToken);
            }

            console.log('Creating new user...');
            // console.log(profile);
            request.body={
                firstName:profile.family_name,
                lastName:profile.given_name,
                userEmail:profile.emails[0].value,
                googleID:profile.id,
                provider:"google"
            }
            let reqData = new UserSchema(request.body);
            reqData.save();
            return done(null,accessToken)            
        }

    ));

}




export default Intialize

// }
//use for authentication done
