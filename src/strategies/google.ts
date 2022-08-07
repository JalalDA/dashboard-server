import passport from "passport";
import { Profile, Strategy, VerifyCallback } from "passport-google-oauth20";
import Users from '../models/UserModel'

passport.use(new Strategy({
    clientID : `${process.env.GOOGLE_CLIENT_ID}`,
    clientSecret : `${process.env.GOOGLE_CLIENT_SECRET}`,
    callbackURL : "http://localhost:5000/auth/google/callback",
    scope : ['email', 'profile']
}, async (
    accessToken : string,
    refreshToken : string,
    profile : Profile,
    done : VerifyCallback
)=>{
    Users.findOrCreate({
        where : {display_name : profile.displayName},
        defaults : {
            email : profile.emails ? profile.emails[0].value : '', 
            display_name : profile.displayName, 
            photo : profile.photos ? profile.photos[0].value : '',
            status : 'active'
        }
    })
    done(null, {name : profile.displayName})
}))

passport.serializeUser(function(user, done) {
    done(null, user);
});
  
  passport.deserializeUser(function(user, done) {
    done(null, null)
  });