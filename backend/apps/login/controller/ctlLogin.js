const jwt = require("jsonwebtoken");
const bCrypt = require("bcryptjs");
const mdlLogin = require("../model/mdlLogin");

const Login = async (req, res, next) => { 
  console.log("Login request received:", req.body);
  const credencial = await mdlLogin.GetCredencial(req.body.username);
  
  console.log("Credenciais recebidas:", credencial);    
   
  if (credencial.length == 0) {
    console.log("Usuário não identificado", req.body.UserName);
    return res.status(403).json({ message: "Usuário não identificado!" });    
  }  

  console.log("Senha fornecida:", req.body.password);
  console.log("Senha armazenada:", credencial[0].password);

  if (bCrypt.compareSync(req.body.Password, credencial[0].password)) {
    console.log("Autenticação bem-sucedida"); 
    const username = credencial[0].username;
    const token = jwt.sign({ username }, process.env.JWT_SECRET, {
      expiresIn: 120 * 60, // Expira em 02 horas
    });
    console.log("Login bem-sucedido para", username);
    return res.json({ auth: true, token: token });
  } else {
    console.log("Senha inválida ou não encontrada");
    res.status(403).json({ message: "Login inválido!" });
  }

  console.log("Login inválido para", req.body.UserName);
  res.status(403).json({ message: "Login inválido!" });
};

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

const Logout = (req, res, next) => {
  res.json({ auth: false, token: null });
};

module.exports = {
  Login,
  Logout,
  AutenticaJWT,
};
