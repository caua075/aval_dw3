const express = require('express');
const path = require('path');
const jogadoresRoutes = require('./app/jogadores/routes/jogadoresRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware para servir arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Middleware para JSON e formulários
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rota principal para login
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/html/login.html'));
});

// Rotas para jogadores
app.use('/jogadores', jogadoresRoutes);

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}/`);
});
