const Sequelize = require('sequelize');
const db = require('./db');
const bcrypt = require("bcryptjs");
const passport = require('passport');

const User = db.define('users', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    login: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    senha: {
        type: Sequelize.STRING,
        allowNull: false
    },
    adm: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    }
})
// {
//     hooks: {
//         beforeCreate: (user) => {
//             const salt = bcrypt.genSaltSync();
//             user.senha = bcrypt.hashSync(login, senha, salt);
//         }
//     },
//     instanceMethods: {
//         validPassword: function(senha) {
//             return bcrypt.compareSync(senha, this.senha);
//         }
//     }
// }


User.sync({ alter: true })
module.exports = User;