const helpers = {};

helpers.isAuthenticated = (req,res, next) => {
    if(req.isAuthenticated()){
        return next();
    }else{
        req.flash('alert_msg', "Você precisa estar logado");
        res.redirect('/login');
    }
}
helpers.isAdmin = (req, res, next) => {
    if(req.isAuthenticated() && req.user.dataValues.adm == 1){
        return next();
    }else{
        req.flash('alert_msg', "Você não tem autorização para acessar esta página");
        res.redirect('/');
    }
}

module.exports = helpers;