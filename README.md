# **O QUE É?**
### Este projeto é a primeira versão de um site para gerenciamento de ramais. 
### Usuários podem ser administradores ou não. Apenas usuários administradores podem adicionar ou remover ramais. 
### Ramais podem ser Virtuais (não possuem ip, nem localização no raque), Analógicos, Digitais ou IP.

# VARIÁVEIS DE AMBIENTE:
- PORT
- DB_NAME
- DB_USER
- DB_PASSWORD
- DB_HOST


# **COMO RODAR O PROJETO RAMALAPP-PROTÓTIPO**
1. Instalar todas as dependencias indicada pelo package.json
> npm install

2. Rodar o projeto com nodemon
> nodemon app.js

## **Sobre o Banco de Dados:**
> Para criar um usuário administrador é preciso alterar o arquivo auth.js na pasta helpers. Comentar o escopo das funções e deixar só o return next, assim é possível entrar na rota localhost:3000/add-user-form e adicionar o primeiro usuário adm. Depois, desfaça as alterações, para que a proteção das rotas volte ao normal. 



## **SEQUENCIA PARA CRIAR O PROJETO**
1. Criar o arquivo package
> npm init

2. Gerencia as requisições, rotas e URLs, entre outra funcionalidades
> npm install express

3. Rodar o projeto 
> node app.js

4. cessar o projeto no navegador
> http://localhost:3000

5. Instalar o módulo para reiniciar o servidor sempre que houver alteração no código fonte, g significa globalmente
> npm install -g nodemon
> npm install --save-dev nodemon

6. Rodar o projeto com nodemon
> nodemon app.js

7. Sequelize é uma biblioteca Javascript que facilita o gerenciamento de um banco de dados SQL
> npm install --save sequelize

8. Instalar o drive do banco de dados
> npm install --save mysql2


Coisas que ja foram feitas:
# Conexão com Banco de Dados
# Cadastro de Usuários
# Adição de Ramais
# Exibir Ramais
# Editar Ramal
# Liberar Ramal
# Front-End
# Configurar passaport e session
# Configurar mensagem flash
# Validação de Login
# Filtro Ramais Tipo
# Filtro Ramais Disponibilidade
# Usuário adm (proteger rotas)
# Pagina trocar senha
# Menus Pop-Ups
# Criptografia das senhas dos usuários
# Arrumar área de busca

Coisas que faltam:
# aDICIONAL rAMAL != Adicionar nova fAIXA
# Legenda do Significado das cores
# Errar login não precisar digitar login dnv e mensagemn flash
# Cor Azul para Ramal tipo Virtual
# Página Inicial Bonita
# Criar área de desenvolvimento e area principal
# Usar o servidor Apache (por no ar o app)
# Upar todos os Ramais
# Upar todos os Ramais