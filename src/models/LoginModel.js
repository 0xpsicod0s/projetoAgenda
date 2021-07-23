const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const LoginSchema = new mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true }
});

const LoginModel = mongoose.model('Login', LoginSchema, 'registers');

class Login {
    constructor(body) {
        this.body = body;
        this.error = [];
        this.user = null;
    }

    async login() {
        this.valida();
        if(this.error.length > 0) return;
        // Verifica se o email consta no banco de dados
        this.user = await LoginModel.findOne({ email: this.body.email });
        // Se o email não constar, executa o if abaixo
        if(!this.user) {
          this.error.push('Usuário não existe.');
          return;
        }
        // Comparando os hash de senha
        if(!bcrypt.compareSync(this.body.password, this.user.password)) {
          this.error.push('Senha inválida');
          this.user = null;
          return;
        }    
    }

    valida() {
        this.cleanUp();
        // Validação
        // Validando o email
        if (!validator.isEmail(this.body.email)) this.error.push('Email inválido');
    
        // Validando a senha
        if (this.body.password.length < 3 || this.body.password.length > 20) {
            this.error.push('Senha inválida');
        }    
    }

    cleanUp() {
        // Fazendo um loop nos dados enviados. Se um dado for 
        // diferente de uma string, ele muda o dado para uma
        // string vazia
        for (let key in this.body) {
            if (typeof this.body[key] !== 'string') {
                this.body[key] = '';
            }
        }
        // Distribuindo os dados para suas respectivas propriedades
        this.body = {
            email: this.body.email,
            password: this.body.password
        }
    }

}

module.exports = Login;