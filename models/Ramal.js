const Sequelize = require('sequelize');
const db = require('./db');

const Ramal = db.define('ramais', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    numero: {
        type: Sequelize.INTEGER,
    },
    userNome: {
        type: Sequelize.STRING
    },
    localNome: {
        type: Sequelize.STRING
    },
    bastidor: {
        type: Sequelize.INTEGER
    },
    slot: {
        type: Sequelize.INTEGER
    },
    terminacaoSoftaware: {
        type: Sequelize.INTEGER
    },
    terminacaoPlaca: {
        type: Sequelize.INTEGER
    },
    grupo: {
        type: Sequelize.STRING
    },
    categoria: {
        type: Sequelize.STRING
    },
    tipo: {
        type: Sequelize.STRING,
        allowNull: false
    },
    ddr: {
        allowNull: false,
        type: Sequelize.INTEGER
    },
    disponibilidade: {
        allowNull: false,
        type: Sequelize.BOOLEAN
    },
    observacao: {
        type: Sequelize.STRING
    }
})
async function insertData () {
    for (let i = 3000; i < 3300;  i++){
        await Ramal.create({
            numero: i,
            tipo: "virtual",
            ddr: false,
            categoria: '10',
            disponibilidade: true
        })
    }
    // for (let i = 1501; i < 1600;  i++){
    //     await Ramal.create({
    //         numero: i,
    //         tipo: "analogico",
    //         ddr: true,
    //         disponibilidade: true
    //     })
    // }
}
// insertData();

Ramal.sync({ alter: true })
module.exports = Ramal;