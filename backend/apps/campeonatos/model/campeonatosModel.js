const pool = require('../../../database/databaseConfig');

// Retorna todos os campeonato (removido = false)
const getAllCampeonato = async () => {
  try {
    const result = await pool.query(
      `SELECT * FROM campeonatos WHERE removido = false ORDER BY id`
    );
    return result.rows;
  } catch (error) {
    console.error('Erro ao buscar campeonatos no banco de dados:', error);
    throw error;
  }
};

// Retorna um campeonato pelo ID (removido = false)
const getCampeonatoById = async (id) => {
  try {
    const result = await pool.query(
      `SELECT * FROM campeonatos WHERE id = $1 AND removido = false`,
      [id]
    );
    return result.rowCount > 0 ? result.rows[0] : null;
  } catch (error) {
    console.error('Erro ao buscar campeonato no banco de dados:', error);
    throw error;
  }
};

// Insere um novo campeonato
const insertCampeonato = async (nome, data_inicio, premio) => {
  try {
    const result = await pool.query(
      `INSERT INTO campeonatos (nome, data_inicio, premio) VALUES ($1, $2, $3) RETURNING *`,
      [nome, data_inicio, premio]
    );
    return result.rows[0];
  } catch (error) {
    console.error('Erro ao inserir campeonato no banco de dados:', error);
    throw error;
  }
};

// Atualiza um campeonato pelo ID
const updateCampeonato = async (id, nome, data_inicio, premio) => {
  try {
    const result = await pool.query(
      `UPDATE campeonatos SET nome = $1, data_inicio = $2, premio = $3 WHERE id = $4 RETURNING *`,
      [nome, data_inicio, premio, id]
    );
    return result.rowCount > 0 ? result.rows[0] : null;
  } catch (error) {
    console.error('Erro ao atualizar campeonato no banco de dados:', error);
    throw error;
  }
};

// Remove logicamente um campeonato (soft delete)
const deleteCampeonato = async (id) => {
  try {
    const result = await pool.query(
      `UPDATE campeoantos SET removido = true WHERE id = $1 RETURNING *`,
      [id]
    );
    return result.rowCount > 0 ? result.rows[0] : null;
  } catch (error) {
    console.error('Erro ao remover campeonato no banco de dados:', error);
    throw error;
  }
};

module.exports = {
  getAllCampeonato,
  getCampeonatoById,
  insertCampeonato,
  updateCampeonato,
  deleteCampeonato,
};
