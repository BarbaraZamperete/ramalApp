const {
    Router
} = require('express');
const router = Router();
const {
    isAuthenticated
} = require('../helpers/auth');
const {
    todosRamais,
    ramalFiltro,
    ramalPage,
    ramalPagePost,
    editForm,
    editRamal,
    addRamal,
    addRamalForm,
    liberarRamal,
    liberarRamalPost,
    buscarRamalForm,
    buscarNumero,
    buscarMatricula,
    buscarLocal
} = require('../controller/ramal.controller')


//###########################################################################################################
//************TODOS OS RAMAIS******************************
router.get('/ramais', isAuthenticated, todosRamais);

//************FILTRO RAMAIS******************************

router.post('/ramais/filtro', isAuthenticated, ramalFiltro)

//###########################################################################################################
//************PÁGINA DO RAMAL******************************
//###########################################################################################################

router.get("/ramais/ramal/:id", isAuthenticated, ramalPage);
router.post("/ramais/ramal/:id", isAuthenticated, ramalPagePost);

//###########################################################################################################
//************EDITAR RAMAL******************************
//###########################################################################################################

router.post("/ramais/ramal/edit-form/:id", isAuthenticated, editForm)
router.post("/ramal/edit-ramal", isAuthenticated, editRamal )

//###########################################################################################################
//************ADICIONAR RAMAIS******************************
//###########################################################################################################

router.get('/add-ramal-form', isAuthenticated, addRamalForm);

router.post('/add-ramal', isAuthenticated, addRamal);

//###########################################################################################################
//************LIBERAR RAMAIS******************************
//###########################################################################################################


router.post("/ramal/liberar-form/:id", isAuthenticated, liberarRamal )
router.post("/ramal/liberar/:id", isAuthenticated, liberarRamalPost)


//###########################################################################################################
// ############ BUSCAR RAMAIS #####################################
router.get("/ramais/buscar", isAuthenticated, buscarRamalForm)

//NÚMERO
router.post("/ramais/buscarNumero", isAuthenticated, buscarNumero )

//NOME OU MATRICULA
router.post("/ramais/buscarMatricula", isAuthenticated, buscarMatricula )

//LOCAL
router.post("/ramais/buscarLocal", isAuthenticated, buscarLocal)

module.exports = router;