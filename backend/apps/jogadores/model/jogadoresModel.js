const pool = require('../../../database/databaseConfig');

// Retorna todos os jogadores (removido = false)
const getAllJogadores = async () => {
  try {
    const result = await pool.query(
      `SELECT * FROM jogadores WHERE removido = false ORDER BY id`
    );
    return result.rows;
  } catch (error) {
    console.error('Erro ao buscar jogadores no banco de dados:', error);
    throw error;
  }
};

// Retorna um jogador pelo ID (removido = false)
const getJogadorById = async (id) => {
  try {
    const result = await pool.query(
      `SELECT * FROM jogadores WHERE id = $1 AND removido = false`,
      [id]
    );
    return result.rowCount > 0 ? result.rows[0] : null;
  } catch (error) {
    console.error('Erro ao buscar jogador no banco de dados:', error);
    throw error;
  }
};

// Insere um novo jogador
const insertJogador = async (nome, data_nascimento, salario, time_id) => {
  try {
    const result = await pool.query(
      `INSERT INTO jogadores (nome, data_nascimento, salario, time_id) VALUES ($1, $2, $3, $4) RETURNING *`,
      [nome, data_nascimento, salario, time_id]
    );
    return result.rows[0];
  } catch (error) {
    console.error('Erro ao inserir jogador no banco de dados:', error);
    throw error;
  }
};

// Atualiza um jogador pelo ID
const updateJogador = async (id, nome, data_nascimento, salario, time_id) => {
  try {
    const result = await pool.query(
      `UPDATE jogadores SET nome = $1, data_nascimento = $2, salario = $3, time_id = $4 WHERE id = $5 RETURNING *`,
      [nome, data_nascimento, salario, time_id, id]
    );
    return result.rowCount > 0 ? result.rows[0] : null;
  } catch (error) {
    console.error('Erro ao atualizar jogador no banco de dados:', error);
    throw error;
  }
};

// Remove logicamente um jogador (soft delete)
const deleteJogador = async (id) => {
  try {
    const result = await pool.query(
      `UPDATE jogadores SET removido = true WHERE id = $1 RETURNING *`,
      [id]
    );
    return result.rowCount > 0 ? result.rows[0] : null;
  } catch (error) {
    console.error('Erro ao remover jogador no banco de dados:', error);
    throw error;
  }
};

module.exports = {
  getAllJogadores,
  getJogadorById,
  insertJogador,
  updateJogador,
  deleteJogador,
};
