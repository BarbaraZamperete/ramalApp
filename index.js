const app = require('./server');
const Ramal = require('./models/Ramal');
const User = require('./models/User');
require('dotenv').config();


//como usar o servidor apache n sei
app.listen(process.env.PORT, () => {
    console.log(`Servidor conectado na porta $(process.env.PORT)`);
})

/*funções
Criar
Editar
Deletar
Exibir todos (separar livre e ocupado)
*/