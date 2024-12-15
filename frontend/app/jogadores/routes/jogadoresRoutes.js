// Importa módulos necessários do Node.js e do controlador de jogadores.
import express from 'express'; // Framework para criar rotas e servidores.
import path from 'path'; // Manipulação de caminhos de arquivos.
import { fileURLToPath } from 'url'; // Para simular o comportamento do __dirname no ES Modules.
import jogadoresController from '../controller/jogadoresController.js'; // Controlador com as funções de gerenciamento de jogadores.

// Resolve o __dirname utilizando fileURLToPath e import.meta.url para compatibilidade com ES Modules.
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Cria um roteador do Express para definir as rotas relacionadas aos jogadores.
const router = express.Router();

// Rota para servir a página HTML dos jogadores.
router.get('/', (req, res) => {
  // Envia o arquivo jogadores.html localizado na pasta public/html como resposta.
  res.sendFile(path.join(__dirname, '../../../public/html/jogadores.html'));
});

// Rota da API para listar todos os jogadores.
router.get('/api', async (req, res) => {
  try {
    // Chama a função getJogadores do controlador para obter os dados e enviá-los como resposta.
    await jogadoresController.getJogadores(req, res);
  } catch (error) {
    // Em caso de erro, exibe no console e retorna uma mensagem de erro com status 500.
    console.error('Erro na rota GET /api:', error);
    res.status(500).json({ message: 'Erro ao listar jogadores.' });
  }
});

// Rota da API para adicionar um novo jogador.
router.post('/api', async (req, res) => {
  try {
    // Chama a função insertJogador do controlador para adicionar um jogador e envia a resposta.
    await jogadoresController.insertJogador(req, res);
  } catch (error) {
    // Em caso de erro, exibe no console e retorna uma mensagem de erro com status 500.
    console.error('Erro na rota POST /api:', error);
    res.status(500).json({ message: 'Erro ao adicionar jogador.' });
  }
});

// Rota da API para atualizar os dados de um jogador.
router.put('/api/:id', async (req, res) => {
  try {
    // Chama a função updateJogador do controlador para atualizar os dados do jogador especificado pelo ID.
    await jogadoresController.updateJogador(req, res);
  } catch (error) {
    // Em caso de erro, exibe no console e retorna uma mensagem de erro com status 500.
    console.error('Erro na rota PUT /api/:id:', error);
    res.status(500).json({ message: 'Erro ao atualizar jogador.' });
  }
});

// Rota da API para remover um jogador (soft delete).
router.delete('/api/:id', async (req, res) => {
  try {
    // Chama a função deleteJogador do controlador para remover o jogador especificado pelo ID.
    await jogadoresController.deleteJogador(req, res);
  } catch (error) {
    // Em caso de erro, exibe no console e retorna uma mensagem de erro com status 500.
    console.error('Erro na rota DELETE /api/:id:', error);
    res.status(500).json({ message: 'Erro ao remover jogador.' });
  }
});

// Exporta o roteador configurado para ser usado em outras partes do projeto.
export default router;
