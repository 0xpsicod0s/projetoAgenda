const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const RegisterSchema = new mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true }
});

const RegisterModel = mongoose.model('Register', RegisterSchema);

class Register {
    constructor(body) {
        this.body = body;
        this.error = [];
        this.user = null;
    }

    async register() {
        this.valida();
        if (this.error.length > 0) return;
        await this.userExists();
        if (this.error.length > 0) return;
        // Fazendo um hash de senha
        this.body.password = bcrypt.hashSync(this.body.password, bcrypt.genSaltSync());
        // Registrando o usuário no banco de dados
        this.user = await RegisterModel.create(this.body);
    }

    async userExists() {
        // Verificando se o usuário já existe
        const user = await RegisterModel.findOne({ email: this.body.email });
        if (user) this.error.push('Usuário já existente, tente novamente!');
    }

    valida() {
        this.cleanUp();
        // Validação
        // Validando o email
        if (!validator.isEmail(this.body.email)) this.error.push('Email inválido');

        // Validando a senha
        if (this.body.password.length < 3 || this.body.password.length > 20) {
            this.error.push('A senha necessita ter entre 3 a 20 caracteres');
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

module.exports = Register;