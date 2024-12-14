const jwt = require("jsonwebtoken");
const bCrypt = require("bcryptjs");
const mdlLogin = require("../model/mdlLogin");

const Login = async (req, res, next) => {
  console.log("Login request received:", req.body);

  // Buscar as credenciais no banco de dados
  const credencial = await mdlLogin.GetCredencial(req.body.username);

  console.log("Credenciais recebidas:", credencial);

  // Verifica se as credenciais foram encontradas
  if (credencial.length == 0) {
    console.log("Usuário não identificado", req.body.username);
    return res.status(403).json({ message: "Usuário não identificado!" });
  }

  console.log("Senha fornecida:", req.body.password);
  console.log("Senha armazenada:", credencial[0].password);

  // Verifique se a senha fornecida é igual à senha armazenada (usando bcrypt)
  if (bCrypt.compareSync(req.body.password, credencial[0].password)) {
    console.log("Autenticação bem-sucedida");

    // Gera o token JWT
    const username = credencial[0].username;
    const token = jwt.sign({ username }, process.env.JWT_SECRET, {
      expiresIn: 120 * 60, // Expira em 2 horas
    });

    console.log("Login bem-sucedido para", username);
    return res.json({ auth: true, token: token });
  } else {
    console.log("Senha inválida ou não encontrada");
    return res.status(403).json({ message: "Login inválido!" });
  }
};

// Função para autenticar o JWT
function AutenticaJWT(req, res, next) {
  const tokenHeader = req.headers["authorization"];
  if (!tokenHeader)
    return res
      .status(200)
      .json({ auth: false, message: "Não foi informado o token JWT" });

  const bearer = tokenHeader.split(" ");
  const token = bearer[1];

  jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {
    if (err)
      return res
        .status(200)
        .json({ auth: false, message: "JWT inválido ou expirado" });

    req.userId = decoded.id;
    next();
  });
}

// Função de logout
const Logout = (req, res, next) => {
  res.json({ auth: false, token: null });
};

module.exports = {
  Login,
  Logout,
  AutenticaJWT,
};
