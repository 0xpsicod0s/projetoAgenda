const Contato = require('../models/RegisterContactModel');

exports.index = async (req, res) => {
  const contatos = await Contato.searchContatos();
  res.render('index', { contatos });
  return;
};