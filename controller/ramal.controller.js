const ramalCTRL = {};

const User = require('../models/User');
const Ramal = require('../models/Ramal');

//###########################################################################################################
//###########################################################################################################
//###########################################################################################################
//************TODOS OS RAMAIS******************************
ramalCTRL.todosRamais = async (req, res) => {
    const ramaisCru = await Ramal.findAll();
    const ramais = [];
    ramaisCru.forEach((r) => {
        ramais.push(r.dataValues);
    })
    res.render('ramais/todos-ramais', {
        ramais
    });
}

//************FILTRO RAMAIS******************************

ramalCTRL.ramalFiltro = async (req, res) => {
    const {
        tipo,
        disponibilidade
    } = req.body;
    let ramaisF = null;
    if (disponibilidade == '1'){
        if (tipo != "null"){
            ramaisF = await Ramal.findAll({where: {disponibilidade: true, tipo: tipo}});
        }else{
            ramaisF = await Ramal.findAll({where: {disponibilidade: true}});
        }
    }else if(disponibilidade == 0){
        if (tipo != "null"){
            ramaisF = await Ramal.findAll({where: {disponibilidade: false, tipo: tipo}});
        }else{
            ramaisF = await Ramal.findAll({where: {disponibilidade: false}});
        }
    }else{
        if (tipo != "null"){
            ramaisF = await Ramal.findAll({where: {tipo: tipo}});
        }
    }
    if (ramaisF){
        const ramais = [];
        ramaisF.forEach((r) => {
            ramais.push(r.dataValues);
        })
        res.render('ramais/todos-ramais', {
            ramais,
            tipo,
            disponibilidade
        });
    }else{
        if (disponibilidade == "null" && tipo == "null"){
            res.redirect('/ramais')
        }
    }
}

//###########################################################################################################
//************PÁGINA DO RAMAL******************************
//###########################################################################################################

ramalCTRL.ramalPage = async (req, res) => {
    const ramal = await Ramal.findOne({
        where: {
            id: req.params.id
        }
    });
    const ramalData = ramal.dataValues
    res.render("ramais/ramal-page", {
        ramalData
    });
}

ramalCTRL.ramalPagePost = async (req, res) => {
    const ramal = await Ramal.findOne({
        where: {
            id: req.params.id
        }
    });
    const ramalData = ramal.dataValues
    res.render("ramais/ramal-page", {
        ramalData
    });
}
//###########################################################################################################
//************EDITAR RAMAL******************************
//###########################################################################################################


ramalCTRL.editForm =  async (req, res) => {
    const ramal = await Ramal.findOne({
        where: {
            id: req.params.id
        }
    });
    const ramalData = ramal.dataValues
    let ip = 0;
    let virtual = 0;
    let digital = 0;
    let analogico = 0;
    if (ramalData.tipo == "ip") {
        ip = 1
    } else if (ramalData.tipo == "virtual") {
        virtual = 1
    } else if (ramalData.tipo == "digital") {
        digital = 1
    } else {
        analogico = 1
    }
    res.render("ramais/ramal-edit", {
        ramalData,
        ip,
        virtual,
        digital,
        analogico
    });
}

ramalCTRL.editRamal = async (req, res) => {
    const {
        numero,
        userNome,
        localNome,
        bastidor,
        slot,
        terminacaoSoftaware,
        grupo,
        categoria,
        tipo,
        ddr,
        observacao
    } = req.body;
    const ramalCru = await Ramal.findOne({
        where: {
            numero: numero
        }
    });
    const ramal = ramalCru.dataValues;
    if (userNome || localNome) {
        await Ramal.update({
            disponibilidade: false,
            userNome: userNome,
            localNome: localNome
        }, {
            where: {
                id: ramal.id
            }
        });

    } else {
        await Ramal.update({
            disponibilidade: true
        }, {
            where: {
                id: ramal.id
            }
        });
    }

    const terminacaoPlaca = parseInt(terminacaoSoftaware) + 1;
    await Ramal.update({
        bastidor: bastidor,
        slot: slot,
        terminacaoSoftaware: terminacaoSoftaware,
        terminacaoPlaca: terminacaoPlaca,
        grupo: grupo,
        categoria: categoria,
        tipo: tipo,
        ddr: ddr,
        observacao: observacao
    }, {
        where: {
            id: ramal.id
        }
    });
    req.flash("success_msg", "Ramal editado com sucesso");
    res.redirect("/ramais/ramal/" + ramal.id)
}

//###########################################################################################################
//************ADICIONAR RAMAIS******************************
//###########################################################################################################


ramalCTRL.addRamalForm = async (req, res) => {
    res.render('ramais/add-ramal');
}

ramalCTRL.addRamal =   async (req, res) => {
    const {
        numero,
        userNome,
        localNome,
        bastidor,
        slot,
        terminacaoSoftaware,
        grupo,
        categoria,
        tipo,
        ddr,
        observacao
    } = req.body;
    const ramal = await Ramal.findOne({
        where: {
            numero: numero
        }
    })
    if (!ramal) {
        const terminacaoPlaca = terminacaoSoftaware + 1;
        let disponibilidade = false;
        if (!userNome && !localNome) {
            disponibilidade = true;
        }

        if (numero && ddr && tipo) {
            const newRamal = await Ramal.create({
                numero: numero,
                userNome: userNome,
                localNome: localNome,
                bastidor: bastidor,
                slot: slot,
                terminacaoSoftaware: terminacaoSoftaware,
                grupo: grupo,
                categoria: categoria,
                tipo: tipo,
                ddr: ddr,
                observacao: observacao,
                terminacaoPlaca: terminacaoPlaca,
                disponibilidade: disponibilidade
            })
        } else {
            req.flash("alert_msg", "Preencha todos os campos");
        }
        req.flash("success_msg", "Ramal adicionado com sucesso");

    } else {
        req.flash("alert_msg", "Este ramal já existe");
    }
    res.redirect('add-ramal-form')
}

//###########################################################################################################
//************LIBERAR RAMAIS******************************
//###########################################################################################################
//###########################################################################################################


ramalCTRL.liberarRamal = async (req, res) => {
    const ramal = await Ramal.findOne({
        where: {
            id: req.params.id
        }
    });
    const ramalData = ramal.dataValues
    res.render("ramais/liberar", {
        ramalData
    });
}

ramalCTRL.liberarRamalPost = async (req, res) => {
    await Ramal.update({
        userNome: null,
        userLocal: null,
        bastidor: null,
        slot: null,
        terminacaoSoftaware: null,
        terminacaoPlaca: null,
        grupo: null,
        categoria: null,
        tipo: "virtual",
        ddr: 0,
        observacao: null,
        disponibilidade: true
    }, {
        where: {
            id: req.params.id
        }
    })
    req.flash("success_msg", "Ramal liberado com sucesso");
    res.redirect("/ramais");
}

//###########################################################################################################
//###########################################################################################################
// ############ BUSCAR RAMAIS #####################################

ramalCTRL.buscarRamalForm =  (req, res) => {
    res.render("ramais/buscar-ramal");
}
//NÚMERO
ramalCTRL.buscarNumero = async (req, res) => {
    const ramal = [];
    if (req.body.numero) {
        const ramalPre = await Ramal.findOne({where: {numero: req.body.numero}})
        if (ramalPre){
            ramal.push(ramalPre.dataValues);
            res.render("ramais/buscar-ramal", {
                ramal
            })
        }else {   
            res.render("ramais/buscar-ramal")
        }

    } else {
        req.flash("alert_msg", "Digite um ramal");
    }

    // console.log(ramal)
}

//NOME OU MATRICULA
ramalCTRL.buscarMatricula =  async (req, res) => {
    let ramaisF = null;
    const ramal = [];
    if (req.body.userNome) {
        ramaisF = await Ramal.findAll({
            where: {
                userNome: req.body.userNome
            }
        })
        if (ramaisF) {

            ramaisF.forEach((r) => {
                ramal.push(r.dataValues);
            })
        }
        res.render("ramais/buscar-ramal", {
            ramal
        })
        
    } else {
        req.flash("alert_msg", "Digite um ramal");
    }

    // console.log(ramal)
}

//LOCAL
ramalCTRL.buscarLocal =  async (req, res) => {
    let ramaisF = null;
    const ramal = [];
    if (req.body.localNome) {
        ramaisF = await Ramal.findAll({
            where: {
                localNome: req.body.localNome
            }
        })
        if (ramaisF) {

            ramaisF.forEach((r) => {
                ramal.push(r.dataValues);
            })
        }else{
            req.flash("alert_msg", "Não existe");
        }
        res.render("ramais/buscar-ramal", {
            ramal
        })

    } else {
        req.flash("alert_msg", "Digite um ramal");
    }

}

module.exports = ramalCTRL;