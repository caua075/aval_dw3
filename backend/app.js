const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const routerCp = require('./apps/campeonatos/routes/campeonatosRoutes');
const routerJg = require('./apps/jogadores/routes/jogadoresRoutes');
const routerTm = require('./apps/times/routes/timesRoutes');
const ctlLogin = require('./apps/login/controller/ctlLogin');
const routerTmCp = require('./apps/time_campeonato/routes/time_campeonatoRoutes');

const app = express();
const port = process.env.PORT || 30000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// Rotas principais
app.get('/', (req, res) => {
  res.send("Olá mundo!");
});

// Montagem das rotas com prefixos
app.use('/camp', routerCp); // Rota base para campeonatos
app.use('/jog', routerJg);  // Rota base para jogadores
app.use('/tim', routerTm);  // Rota base para times
app.use('/time_camp', routerTmCp); // Rota base para time_campeonatos

app.get('/login/validate', ctlLogin.AutenticaJWT);
app.post('/login', ctlLogin.Login);
app.post('/logout', ctlLogin.Logout);

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
