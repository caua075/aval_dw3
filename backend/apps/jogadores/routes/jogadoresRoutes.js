const express = require('express'); // Importa o framework Express para criar rotas.
const jogadoresController = require('../controller/jogadoresController'); // Importa o controlador dos jogadores.
const authenticateToken = require('../../../middleware/authenticateToken'); // Middleware para autenticar o token de acesso.
const appLogin = require('../../login/controller/ctlLogin'); // Controlador de login e logout.

const router = express.Router(); // Cria um roteador do Express para gerenciar rotas relacionadas aos jogadores.

// Rotas para login e logout.
router.post("/login", appLogin.Login); // Rota para realizar o login. Não exige autenticação prévia.
router.post("/logout", appLogin.Logout); // Rota para realizar o logout. Não exige autenticação prévia.

// Rotas para gerenciar jogadores.
// Todas as rotas abaixo exigem autenticação de token por meio do middleware "authenticateToken".

// Rota para inserir um novo jogador.
router.post('/', authenticateToken, jogadoresController.insertJogador);

// Rota para listar todos os jogadores.
router.get('/', authenticateToken, jogadoresController.getJogadores);

// Rota para buscar um jogador específico pelo ID.
router.get('/:id', authenticateToken, jogadoresController.getJogadorById);

// Rota para atualizar os dados de um jogador específico pelo ID.
router.put('/:id', authenticateToken, jogadoresController.updateJogador);

// Rota para remover logicamente (soft delete) um jogador específico pelo ID.
router.delete('/:id', authenticateToken, jogadoresController.deleteJogador);

// Exporta o roteador configurado para ser utilizado em outras partes do projeto.
module.exports = router;
