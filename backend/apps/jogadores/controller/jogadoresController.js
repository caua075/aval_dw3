const pool = require('../../../database/databaseConfig');

// Retorna todos os jogadores (removido = false)
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

// Retorna um jogador por ID (removido = false)
exports.getJogadorById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      `SELECT * FROM jogadores WHERE id = $1 AND removido = false`,
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

// Insere um novo jogador
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

// Atualiza um jogador
exports.updateJogador = async (req, res) => {
  const { id } = req.params;
  const { nome, data_nascimento, salario, time_id } = req.body;
  try {
    const result = await pool.query(
      `UPDATE jogadores SET nome = $1, data_nascimento = $2, salario = $3, time_id = $4 WHERE id = $5 RETURNING *`,
      [nome, data_nascimento, salario, time_id, id]
    );
    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Jogador não encontrado.' });
    }
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error('Erro ao atualizar jogador:', error);
    res.status(500).json({ message: 'Erro ao atualizar jogador.' });
  }
};

// Remove logicamente um jogador (soft delete)
exports.deleteJogador = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      `UPDATE jogadores SET removido = true WHERE id = $1 RETURNING *`,
      [id]
    );
    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Jogador não encontrado.' });
    }
    res.status(200).json({ message: 'Jogador removido com sucesso.' });
  } catch (error) {
    console.error('Erro ao remover jogador:', error);
    res.status(500).json({ message: 'Erro ao remover jogador.' });
  }
};
