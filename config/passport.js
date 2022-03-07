const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const bcrypt = require("bcrypt");
const User = require("../models/User");

passport.use(new LocalStrategy({
    usernameField: 'login',
    passwordField: 'senha'
}, async (login, senha, done) => {
    const user = await User.findOne({where: {login: login}});
    //se n existe esse login
    // console.log(user.dataValues);
    if(!user){
        return done(null, false, {message: 'usuário não encontrado'})
    }else{
        //senha combina com o usuário encontrado
        const valid = await bcrypt.compare(senha, user.dataValues.senha);
        if(valid){
            
            return done(null, user); 
        }else{
            return done(null, false, {message: 'senha errada'})
        }
    }
}))

passport.serializeUser((user, done) => {
    done(null, user.dataValues.id);
    
})

passport.deserializeUser(async (id, done) => {
    try{
        const user = await User.findByPk(id);
        done(null, user);
    }catch(err){
        done(err, null);
    }    
})