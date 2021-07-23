const Contato = require('../models/RegisterContactModel');

exports.index = (req, res) => {
    if (!req.session.user) {
        req.flash('error', 'Para acessar essa página, é necessário que esteja logado');
        req.session.save(() => res.redirect('/'));
        return;
    }
    res.render('contato', {
        contato: {}
    });
};

exports.register = async (req, res) => {
    if (!req.session.user) {
        req.flash('error', 'Para acessar essa página, é necessário que esteja logado');
        req.session.save(() => res.redirect('/'));
        return;
    }
    try {
        const contato = new Contato(req.body);
        await contato.register();
        if (contato.error.length > 0) {
            req.flash('error', contato.error);
            req.session.save(() => res.redirect('/contato'));
            return;
        }
    
        req.flash('success', 'Contato registrado com sucesso!');
        req.session.save(() => res.redirect(`/contato/${contato.contato._id}`));
        return;    
    } catch(e) {
        console.log(e);
        res.render('404');
    }
};

exports.editIndex = async (req, res) => {
    if (!req.session.user) {
        req.flash('error', 'Para acessar essa página, é necessário que esteja logado');
        req.session.save(() => res.redirect('/'));
        return;
    }
    if (!req.params.id) return res.render('404');
    const contatoInst = new Contato(req.body);
    const contato = await contatoInst.searchId(req.params.id);
    if (!contato) return res.render('404');
    res.render('contato', { contato });
};

exports.edit = async (req, res) => {
    if (!req.session.user) {
        req.flash('error', 'Para acessar essa página, é necessário que esteja logado');
        req.session.save(() => res.redirect('/'));
        return;
    }
    try {
        if (!req.params.id) return res.render('404');
        const contato = new Contato(req.body);
        await contato.edit(req.params.id);
        if (contato.error.length > 0) {
            req.flash('error', contato.error);
            req.session.save(() => res.redirect('/contato'));
            return;
        }
        req.flash('success', 'Contato editado com sucesso!');
        req.session.save(() => res.redirect(`/contato/${contato.contato._id}`));
        return;    
    } catch(e) {
        console.log(e);
        res.render('404');
    }
};

exports.delete = async (req, res) => {
    if (!req.session.user) {
        req.flash('error', 'Para acessar essa página, é necessário que esteja logado');
        req.session.save(() => res.redirect('/'));
        return;
    }
    if (!req.params.id) return res.render('404');
    const contato = await Contato.deleteContatos(req.params.id);
    if (!contato) return res.render('404');
    req.flash('success', 'Contato apagado com sucesso!');
    req.session.save(() => res.redirect('/'));
    return;
};