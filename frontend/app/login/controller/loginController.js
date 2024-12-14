const axios = require('axios');

exports.renderLogin = (req, res) => {
  res.render('login');
};

exports.login = async (req, res) => {
  try {
    const response = await axios.post(`${process.env.API_URL}/login`, req.body);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao realizar login' });
  }
};
