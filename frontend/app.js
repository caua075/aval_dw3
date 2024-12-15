import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';  // Importando fileURLToPath para usar import.meta.url
import jogadoresRoutes from './app/jogadores/routes/jogadoresRoutes.js';
import timesRoutes from './app/times/routes/timesRoutes.js';
import campeonatosRoutes from './app/campeonatos/routes/campeonatosRoutes.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Usando import.meta.url para simular __dirname
const __filename = fileURLToPath(import.meta.url);  // Obtém o caminho do arquivo atual
const __dirname = path.dirname(__filename);  // Calcula o diretório do arquivo atual

// Middleware para servir arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Middleware para JSON e formulários
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rota principal para login
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'html', 'login.html'));
});

// Rotas para jogadores
app.use('/jogadores', jogadoresRoutes);

// Rotas para times
app.use('/times', timesRoutes);

// Rotas para campeonatos
app.use('/campeonatos', campeonatosRoutes);

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}/`);
});
