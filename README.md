# **SOBRE O PROJETO RAMALAPP**
### Este projeto é a primeira versão de um site para gerenciamento de ramais.
### A versão Oficial e mais complexa deste projeto está sendo desenvolvida em [ramalapp-Oficial](https://github.com/BarbaraZamperete/ramalApp-Oficial)  
#### Usuários podem ser administradores ou não. Apenas usuários administradores podem adicionar ou remover ramais. 
#### Ramais podem ser Virtuais (não possuem ip, nem localização no raque), Analógicos, Digitais ou IP.

# VARIÁVEIS DE AMBIENTE:
- PORT
- DB_NAME
- DB_USER
- DB_PASSWORD
- DB_HOST


# **Como rodar o projeto RamalApp?**
1. Instalar todas as dependencias indicadas pelo package.json
> npm install

2. Rodar o projeto com nodemon
> nodemon app.js

## **Sobre o Banco de Dados:**
> Para criar um usuário administrador é preciso alterar o arquivo auth.js na pasta helpers. Comentar o escopo das funções e deixar só o return next, assim é possível entrar na rota localhost:3000/add-user-form e adicionar o primeiro usuário adm. Depois, desfaça as alterações, para que a proteção das rotas volte ao normal. 



### Coisas que ja foram feitas:
- Conexão com Banco de Dados
- Cadastro de Usuários
- Adição de Ramais
- Exibir Ramais
- Editar Ramal
- Liberar Ramal
- Front-End
- Configurar passaport e session
- Configurar mensagem flash
- Validação de Login
- Filtro Ramais Tipo
- Filtro Ramais Disponibilidade
- Usuário adm (proteger rotas)
- Pagina trocar senha
- Menus Pop-Ups
- Criptografia das senhas dos usuários
- Arrumar área de busca

### Coisas que faltam:
- Adicionar ramal != Adicionar nova fAIXA
- Legenda do Significado das cores
- Errar login não precisar digitar login dnv e mensagemn flash
- Cor Azul para Ramal tipo Virtual
- Página Inicial Bonita
- Criar área de desenvolvimento e area principal
- Usar o servidor Apache (por no ar o app)
- Upar todos os Ramais
- Upar todos os Ramais