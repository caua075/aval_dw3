const pool = require('../../../database/databaseConfig');

// Retorna todos os campeonatos (removido = false)
exports.getCampeonato = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT * FROM campeonatos WHERE removido = false ORDER BY id`
    );
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Erro ao buscar campeonatos:', error);
    res.status(500).json({ message: 'Erro ao buscar campeonatos.' });
  }
};

// Retorna um campeonato pelo ID (removido = false)
exports.getCampeonatoById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      `SELECT * FROM campeonatos WHERE id = $1 AND removido = false`,
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

// Insere um novo campeonato
exports.insertCampeonato = async (req, res) => {
  const { nome, data_inicio, premio } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO campeonatos (nome, data_inicio, premio) VALUES ($1, $2, $3) RETURNING *`,
      [nome, data_inicio, premio]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Erro ao inserir campeonato:', error);
    res.status(500).json({ message: 'Erro ao inserir campeonato.' });
  }
};

// Atualiza um campeonato
exports.updateCampeonato = async (req, res) => {
  const { id } = req.params;
  const { nome, data_inicio, premio } = req.body;
  try {
    const result = await pool.query(
      `UPDATE campeonatos SET nome = $1, data_inicio = $2, premio = $3 WHERE id = $5 RETURNING *`,
      [nome, data_inicio, premio, id]
    );
    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Campeonato não encontrado.' });
    }
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error('Erro ao atualizar campeonato:', error);
    res.status(500).json({ message: 'Erro ao atualizar o campeonato.' });
  }
};

// Remove logicamente um Campeonato (soft delete)
exports.deleteCampeonato = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      `UPDATE campeonatos SET removido = true WHERE id = $1 RETURNING *`,
      [id]
    );
    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Campeonato não encontrado.' });
    }
    res.status(200).json({ message: 'Campeonato removido com sucesso.' });
  } catch (error) {
    console.error('Erro ao remover Campeonato:', error);
    res.status(500).json({ message: 'Erro ao remover o campeonato.' });
  }
};
