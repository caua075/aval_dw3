const pool = require('../../../database/databaseConfig'); // Importa a configuração do banco de dados.

// Retorna todos os jogadores (apenas aqueles que não foram removidos logicamente).
exports.getJogadores = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT * FROM jogadores WHERE removido = false ORDER BY id` 
    );
    res.status(200).json(result.rows); 
  } catch (error) {
    console.error('Erro ao buscar jogadores:', error); 
    res.status(500).json({ message: 'Erro ao buscar jogadores.' });
  }
};

// Retorna um jogador específico pelo ID (apenas se não estiver removido logicamente).
exports.getJogadorById = async (req, res) => {
  const { id } = req.params; // Extrai o ID do jogador dos parâmetros da requisição.
  try {
    const result = await pool.query(
      `SELECT * FROM jogadores WHERE id = $1 AND removido = false`, // Busca o jogador pelo ID com "removido = false".
      [id]
    );
    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Jogador não encontrado.' });
    }
    res.status(200).json(result.rows[0]); 
  } catch (error) {
    console.error('Erro ao buscar jogador:', error); 
    res.status(500).json({ message: 'Erro ao buscar jogador.' }); 
  }
};

// Insere um novo jogador no banco de dados.
exports.insertJogador = async (req, res) => {
  const { nome, data_nascimento, salario, time_id } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO jogadores (nome, data_nascimento, salario, time_id) VALUES ($1, $2, $3, $4) RETURNING *`, 
      [nome, data_nascimento, salario, time_id]
    );
    res.status(201).json(result.rows[0]); 
  } catch (error) {
    console.error('Erro ao inserir jogador:', error); 
    res.status(500).json({ message: 'Erro ao inserir jogador.' }); 
  }
};

// Atualiza os dados de um jogador existente.
exports.updateJogador = async (req, res) => {
  const { id } = req.params; // Extrai o ID do jogador dos parâmetros da requisição.
  const { nome, data_nascimento, salario, time_id } = req.body; // Extrai os dados do corpo da requisição.
  
  console.log('Dados recebidos para atualização:', { id, nome, data_nascimento, salario, time_id }); // Loga os dados recebidos para atualização.

  try {
    const result = await pool.query(
      `UPDATE jogadores SET nome = $1, data_nascimento = $2, salario = $3, time_id = $4 WHERE id = $5 RETURNING *`, // Atualiza os dados do jogador na tabela.
      [nome, data_nascimento, salario, time_id, id]
    );
    if (result.rowCount === 0) {
      // Se nenhum jogador for encontrado com o ID fornecido, retorna status 404 (não encontrado).
      return res.status(404).json({ message: 'Jogador não encontrado.' });
    }
    res.status(200).json(result.rows[0]); // Retorna o jogador atualizado com status 200 (OK).
  } catch (error) {
    console.error('Erro ao atualizar jogador:', error); // Loga o erro no console para depuração.
    res.status(500).json({ message: 'Erro ao atualizar jogador.' }); // Retorna um status 500 (erro interno do servidor).
  }
};

// Remove logicamente um jogador (soft delete).
exports.deleteJogador = async (req, res) => {
  const { id } = req.params; // Extrai o ID do jogador dos parâmetros da requisição.
  try {
    const result = await pool.query(
      `UPDATE jogadores SET removido = true WHERE id = $1 RETURNING *`, // Atualiza o campo "removido" para true no jogador correspondente.
      [id]
    );
    if (result.rowCount === 0) {
      // Se nenhum jogador for encontrado com o ID fornecido, retorna status 404 (não encontrado).
      return res.status(404).json({ message: 'Jogador não encontrado.' });
    }
    res.status(200).json({ message: 'Jogador removido com sucesso.' }); // Retorna uma mensagem de sucesso com status 200 (OK).
  } catch (error) {
    console.error('Erro ao remover jogador:', error); // Loga o erro no console para depuração.
    res.status(500).json({ message: 'Erro ao remover jogador.' }); // Retorna um status 500 (erro interno do servidor).
  }
};
