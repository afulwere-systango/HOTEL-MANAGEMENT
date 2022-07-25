import passport from "passport";
import passportLocal from "passport-local";
import UserSchema from '../models/userModel';
import bcrypt from "bcrypt";
import  jwt  from "jsonwebtoken";

const LocalStrategy = passportLocal.Strategy;


const initializePass = (passport:any) => {
   
   
    const validatePassword =  (password: any, user: any) => {
        
            return bcrypt.compareSync(password, user.userPass);
    }
    passport.use(new LocalStrategy({
        
        usernameField: 'userEmail',
        passwordField: 'userPass',
    }, (email: any, password: any, done: any) => {
        console.log(email,password);
        
        UserSchema.findOne({ userEmail: email })
            .then((user) => {
                console.log(validatePassword(password, user));
                
                if (!user || !validatePassword(password, user)) {
                    return done(null,  'password is invalid'  );
                }else{
                    const token :any= jwt.sign(
                        { user_id: user._id},
                        `${process.env.TOKEN_KEY}`
                        // {
                        //   expiresIn: "2h",
                        // }
                      );
                      return done(null, token);
                }

            }).catch(()=>{
                done(null, 'wrong email' ); 
            });
    }));

}
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


export default initializePass;