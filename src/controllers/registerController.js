const Register = require('../models/RegisterModel');

exports.index = (req, res) => {
    if (req.session.user) {
        req.flash('error', 'É necessário que saia da conta para entrar na página de registro');
        req.session.save(() => res.redirect('/'));
        return;
    }
    res.render('register');
};

exports.register = async (req, res) => {
    try {
        const register = new Register(req.body);
        await register.register();
    
        if (register.error.length > 0) {
            req.flash('error', register.error);
            req.session.save(() => {
                return res.redirect('/register');
            });
            return;
        }
        req.flash('success', 'Conta criada com sucesso!');
        req.session.save(() => {
            return res.redirect('/register');
        });
    } catch(e) {
        console.log(e);
        return res.render('404');
    }
};