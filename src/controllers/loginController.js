const Login = require('../models/LoginModel');

exports.index = (req, res) => {
    if (req.session.user) return res.redirect('/');
    res.render('login');
};

exports.login = async (req, res) => {
    try {
        const login = new Login(req.body);
        await login.login();
    
        if (login.error.length > 0) {
            req.flash('error', login.error);
            req.session.save(() => {
                return res.redirect('/login');
            });
            return;
        }
        req.flash('success', 'Login efetuado!');
        req.session.user = login.user;
        req.session.save(() => res.redirect('/login'));
    } catch(e) {
        console.log(e);
        return res.render('404');
    }
};

exports.logout = (req, res) => {
    req.session.destroy();
    res.redirect('/');
};