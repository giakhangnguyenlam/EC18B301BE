const LocalStrategy=require("passport-local").Strategy;
const bcrypt=require('bcrypt');
const user=require("../models/User");

function initialize(passport,getUserById,getUserByEmail){


    const authenticateUser=(email,password,done)=>{
        const user=await user.findBy("email",email)
        if(user==null)
        return done(null,false,{meassage:'No user with that username'}) ;
        try{
            if(await bcrypt.compare(password,user.password))
            {
                return done(null,user);
            }
            else
            {
                return done(null,false,{meassage:'Password is incorrect'}) ;
            }
        }
        catch(error)
        {
            return done(e);
        }

    }
    passport.use(new LocalStrategy({usernameField: 'email'}),
    authenticateUser)
    passport.serializeUser((user,done)=>{done(null,user.id)
    })
    passport.deserializeUser((id,done)=>{
        return done(null,getUserById(id))
    }) 
}
module.exports=new initialize;