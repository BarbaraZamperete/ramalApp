const {
    Router
} = require('express');
const User = require("../models/User");
const {
    create
} = require('express-handlebars');
const router = Router();
const passport = require("passport")
const {
    isAdmin,
    isAuthenticated
} = require('../helpers/auth');
const async = require('hbs/lib/async');
const bcrypt = require('bcrypt');

router.get('/add-user-form', isAdmin, (req, res) => {
    if(req.user){
        res.render("user/add-user");
    }else{
        req.flash("alert_msg", "Você não tem permição para acessar essa página");
        res.redirect("/");
    }
    
    
})
router.post('/add-user', isAdmin, async (req, res) => {
    // console.log(req.body);
    const {
        login,
        senha,
        senhaVerify,
        adm
    } = req.body;
    let admB = false;
    if (adm == "1"){
        admB = true;
    }
    // console.log(login, senha);
    if (req.body) {
        const userExiste = await User.findOne({where: {login: login}});
        if(!userExiste){
            if (!login || !senha || !senhaVerify) {
                req.flash('alert_msg', "Preencha todos os campos")
            } else if (senha != senhaVerify) {
                req.flash('alert_msg', "As duas senhas são diferentes")
                res.redirect("/add-user-form");
            } else {
                const salt = await bcrypt.genSalt(10);
                const password = await bcrypt.hash(senha, salt);
                const newUser = await User.create({
                    login: login,
                    senha: password,
                    adm: admB
                })
                req.flash("success_msg", "Usuário adicionado com sucesso")
            }
            res.render("user/login");
        }
        else{
            req.flash("alert_msg", "Usuário já existe")
        }  
    } else {
        res.send("ERRO");
    }
    res.redirect('/add-user-form');
})

//************ LOGIN VERIFY******************************

router.get('/login', async (req, res) => {
    res.render('user/login');
    // const x = await User.findOne({where: {login: "jorge"}})
    // console.log(x.dataValues);
})

router.post('/login', passport.authenticate('local', {
    failureRedirect: '/login',
    successRedirect: '/',
    failureFlash: true
}))

router.get('/logout', isAuthenticated, (req, res) => {
    req.logout();
    req.flash('success_msg', 'Você foi deslogado')
    res.redirect('/login');
});

//#################### ALTERAR SENHA ####################
router.get('/senha-alterar', isAuthenticated, (req, res) => {
    res.render("user/alterar-senha");
})
router.post('/senha-alterar', isAuthenticated, async (req, res) => {
    const { senhaAtual, senhaNova, senhaNovaVerify } = req.body
    if(req.user.dataValues.senha == senhaAtual){
        if(senhaNova == senhaNovaVerify){
            await User.update({senha: senhaNova}, {where: {id: req.user.dataValues.id}})
            req.flash("success_msg", "Senha alterada com sucesso");
        }else{
            req.flash("alert_msg", "Você deve repetir a nova senha")
        }
    }else{
        req.flash("alert_msg", "Senha atual incorreta")
    }
    res.redirect('/senha-alterar');
})
module.exports = router;