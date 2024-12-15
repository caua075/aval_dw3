const pool = require('../../../database/databaseConfig'); // Importa a configuração do banco de dados.

// Retorna todos os jogadores que não foram removidos logicamente.
const getAllJogadores = async () => {
  try {
    const result = await pool.query(
      `SELECT * FROM jogadores WHERE removido = false ORDER BY id` // Consulta todos os jogadores com "removido = false", ordenados pelo ID.
    );
    return result.rows; // Retorna as linhas encontradas.
  } catch (error) {
    console.error('Erro ao buscar jogadores no banco de dados:', error); // Loga o erro no console para depuração.
    throw error; // Lança o erro para que ele possa ser tratado no nível superior.
  }
};

// Retorna um jogador específico pelo ID, desde que não esteja marcado como removido logicamente.
const getJogadorById = async (id) => {
  try {
    const result = await pool.query(
      `SELECT * FROM jogadores WHERE id = $1 AND removido = false`, // Consulta o jogador pelo ID com "removido = false".
      [id] // Substitui o placeholder $1 pelo valor do ID fornecido.
    );
    return result.rowCount > 0 ? result.rows[0] : null; // Retorna o jogador encontrado ou null, caso nenhum seja encontrado.
  } catch (error) {
    console.error('Erro ao buscar jogador no banco de dados:', error); // Loga o erro no console para depuração.
    throw error; // Lança o erro para que ele possa ser tratado no nível superior.
  }
};

// Insere um novo jogador no banco de dados.
const insertJogador = async (nome, data_nascimento, salario, time_id) => {
  try {
    const result = await pool.query(
      `INSERT INTO jogadores (nome, data_nascimento, salario, time_id) VALUES ($1, $2, $3, $4) RETURNING *`, // Insere um novo jogador e retorna os dados inseridos.
      [nome, data_nascimento, salario, time_id] // Substitui os placeholders pelos valores fornecidos.
    );
    return result.rows[0]; // Retorna os dados do jogador recém-inserido.
  } catch (error) {
    console.error('Erro ao inserir jogador no banco de dados:', error); // Loga o erro no console para depuração.
    throw error; // Lança o erro para que ele possa ser tratado no nível superior.
  }
};

// Atualiza os dados de um jogador existente pelo ID.
const updateJogador = async (id, nome, data_nascimento, salario, time_id) => {
  try {
    const result = await pool.query(
      `UPDATE jogadores SET nome = $1, data_nascimento = $2, salario = $3, time_id = $4 WHERE id = $5 RETURNING *`, // Atualiza os dados do jogador pelo ID e retorna os dados atualizados.
      [nome, data_nascimento, salario, time_id, id] // Substitui os placeholders pelos valores fornecidos.
    );
    return result.rowCount > 0 ? result.rows[0] : null; // Retorna os dados do jogador atualizado ou null, caso nenhum seja encontrado.
  } catch (error) {
    console.error('Erro ao atualizar jogador no banco de dados:', error); // Loga o erro no console para depuração.
    throw error; // Lança o erro para que ele possa ser tratado no nível superior.
  }
};

// Remove logicamente um jogador, marcando-o como removido.
const deleteJogador = async (id) => {
  try {
    const result = await pool.query(
      `UPDATE jogadores SET removido = true WHERE id = $1 RETURNING *`, // Atualiza o campo "removido" para true no jogador especificado pelo ID.
      [id] // Substitui o placeholder $1 pelo valor do ID fornecido.
    );
    return result.rowCount > 0 ? result.rows[0] : null; // Retorna os dados do jogador atualizado ou null, caso nenhum seja encontrado.
  } catch (error) {
    console.error('Erro ao remover jogador no banco de dados:', error); // Loga o erro no console para depuração.
    throw error; // Lança o erro para que ele possa ser tratado no nível superior.
  }
};

// Exporta as funções do modelo para que possam ser utilizadas em outras partes do projeto.
module.exports = {
  getAllJogadores,
  getJogadorById,
  insertJogador,
  updateJogador,
  deleteJogador,
};
