const pool = require('../../../database/databaseConfig');

// Retorna todos os times (removido = false)
const getAllTimes = async () => {
  try {
    const result = await pool.query(
      `SELECT * FROM times WHERE removido = false ORDER BY id`
    );
    return result.rows;
  } catch (error) {
    console.error('Erro ao buscar times no banco de dados:', error);
    throw error;
  }
};

// Retorna um time pelo ID (removido = false)
const getTimeById = async (id) => {
  try {
    const result = await pool.query(
      `SELECT * FROM times WHERE id = $1 AND removido = false`,
      [id]
    );
    return result.rowCount > 0 ? result.rows[0] : null;
  } catch (error) {
    console.error('Erro ao buscar time no banco de dados:', error);
    throw error;
  }
};

// Insere um novo time
const insertTime = async (nome, data_criacao, orcamento) => {
  try {
    const result = await pool.query(
      `INSERT INTO times (nome, data_criacao, orcamento) VALUES ($1, $2, $3) RETURNING *`,
      [nome, data_criacao, orcamento]
    );
    return result.rows[0];
  } catch (error) {
    console.error('Erro ao inserir time no banco de dados:', error);
    throw error;
  }
};

// Atualiza um time pelo ID
const updateTime = async (id, nome, data_criacao, orcamento) => {
  try {
    const result = await pool.query(
      `UPDATE times SET nome = $1, data_criacao = $2, orcamento = $3 WHERE id = $4 RETURNING *`,
      [nome, data_criacao, orcamento, id]
    );
    return result.rowCount > 0 ? result.rows[0] : null;
  } catch (error) {
    console.error('Erro ao atualizar time no banco de dados:', error);
    throw error;
  }
};

// Remove logicamente um time (soft delete)
const deleteTime = async (id) => {
  try {
    const result = await pool.query(
      `UPDATE times SET removido = true WHERE id = $1 RETURNING *`,
      [id]
    );
    return result.rowCount > 0 ? result.rows[0] : null;
  } catch (error) {
    console.error('Erro ao remover time no banco de dados:', error);
    throw error;
  }
};

module.exports = {
  getAllTimes,
  getTimeById,
  insertTime,
  updateTime,
  deleteTime,
};
