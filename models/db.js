const Sequelize = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: 'localhost',
    dialect: 'mysql'
}, 'mysql::memory', {
    logging: false
});

sequelize.authenticate().then(function(){
    console.log("Conexão com o Banco de dados com Sucesso");
}).catch(function(){
    console.log("Erro na Conexão com o banco de dados");
})

module.exports = sequelize;