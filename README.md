# Projeto Agenda

<img height="300px" src="https://i.imgur.com/EorngqQ.png?1" alt="agenda">

> Projeto para salvar contatos. É um projeto simples, fiz para meus estudos no back end. Ele necessita de algumas melhorias, você pode fazer isso ou esperar eu mesmo aplicar essas melhorias. Mas o projeto em si, está totalmente funcional.

## 🛠 Tecnologias

- **Front-End**
  - [HTML](https://developer.mozilla.org/pt-BR/docs/Web/HTML)
  - [Bootstrap](https://getbootstrap.com/)
  
- **Back-End**
  - [Node.js](https://nodejs.org/en/)
  - [Express](https://expressjs.com/pt-br/)
  - [Mongoose](https://mongoosejs.com/)

## 💡 Ajustes e melhorias

O projeto ainda está em desenvolvimento e as prováveis próximas atualizações serão voltadas nas seguintes tarefas:

- [ ] Validar os formulários no front end
- [ ] Deixar o registro e edição de contatos em páginas diferentes

```bash
# Estas são algumas melhorias que eu pensei, caso você pense em alguma, pode me chamar no discord e recomendar
Discord: .̾/̾cxn#0001
```

## 💻 Pré-requisitos

Antes de começar, verifique se você atendeu aos seguintes requisitos:
<!---Estes são apenas requisitos de exemplo. Adicionar, duplicar ou remover conforme necessário--->
* Você instalou a versão mais recente do [Node.js](https://nodejs.org/en/).

## ⬇ Instalando o projeto Agenda

Para instalar a agenda, siga estas etapas:

```bash
# Faça o download do projeto para sua máquina, pelo próprio github ou através do terminal utilizando:
$ git clone https://github.com/cxnd3v/projetoAgenda

# Acesse o projeto, no caso do projeto, utilizando:
$ cd ProjetoAgenda

# Instale as depedências do Node.js
$ npm i
```

## ☕ Usando a agenda

Para usar a agenda, siga estas etapas:

```bash
# Rode o servidor local através do comando:
$ npm start

# Crie um arquivo na raiz do projeto denominado de ".env" (sem aspas)

# No arquivo .env adicione a string de conexão com a database
CONNECTIONSTRING=string de conexao
# É importante que o nome da variável seja CONNECTIONSTRING para que a conexão com o banco de dados seja feita sem necessidade de alterações no código

# Em seguida, acesse o servidor local através do seu navegador, na porta 3000 (porta padrão que deixei)
Para acessar o servidor local: http://localhost:3000
```

## 📂 Estrutura do diretório

```
|-- node_modules/
|-- src/
  |-- controllers/
    |-- contatoController.js
    |-- homeController.js
    |-- loginController.js
    |-- registerController.js
  |-- middlewares/
    |-- middleware.js
  |-- models/
    |-- LoginModel.js
    |-- RegisterContactModel.js
    |-- RegisterModel.js
  |-- views/
    |-- includes/
        |-- footer.ejs
        |-- head.ejs
        |-- messages.ejs
        |-- nav.ejs
    |-- 404.ejs
    |-- contato.ejs
    |-- index.ejs
    |-- login.ejs
    |-- register.ejs
|-- .env
|-- .gitignore
|-- package-lock.json
|-- package.json
|-- README.md
|-- routes.js
|-- server.js
```
