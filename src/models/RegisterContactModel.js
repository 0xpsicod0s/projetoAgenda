const mongoose = require('mongoose');
const validator = require('validator');

const ContatoSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    sobrenome: { type: String, default: '' },
    email: { type: String, default: '' },
    telefone: { type: String, default: '' },
    dataDeCriacao: { type: Date, default: Date.now }
});

const ContatoModel = mongoose.model('Contato', ContatoSchema);

class Contato {
    constructor(body) {
        this.body = body;
        this.error = [];
        this.contato = null;
    }

    async searchId(id) {
        if (typeof id !== 'string') return;
        const user = await ContatoModel.findById(id);
        return user;
    }

    async register() {
        this.valida();
        if (this.error.length > 0) return;
        this.contato = await ContatoModel.create(this.body);
    }

    valida() {
        this.cleanUp();
        // Validação
        // Validando o nome
        if (!this.body.nome) this.error.push('É necessário um nome para registrar o contato');
        // Validando o email
        if (this.body.email && !validator.isEmail(this.body.email)) this.error.push('Email inválido');
        // Validando se email e telefone não foi enviado
        if (!this.body.email && !this.body.telefone) this.error.push('É necessário um email ou um telefone do contato');
    
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
            nome: this.body.nome,
            sobrenome: this.body.sobrenome,
            email: this.body.email,
            telefone: this.body.telefone
        }
    }

    async edit(id) {
        if (typeof id !== 'string') return;
        this.valida();
        if (this.error.length > 0) return;
        this.contato = await ContatoModel.findByIdAndUpdate(id, this.body, { new: true });
    }

    static async searchContatos() {
        const contatos = await ContatoModel.find().sort({ dataDeCriacao: -1 });
        return contatos;
    }

    static async deleteContatos(id) {
        if (typeof id !== 'string') return;
        const contato = await ContatoModel.findOneAndDelete({ _id: id });
        return contato;
    }
}

module.exports = Contato;