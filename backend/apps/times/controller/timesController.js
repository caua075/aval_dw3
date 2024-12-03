const pool = require('../../../database/databaseConfig');

// Retorna todos os times (removido = false)
exports.getAllTimes = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT * FROM times WHERE removido = false ORDER BY id`
    );
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Erro ao buscar times:', error);
    res.status(500).json({ message: 'Erro ao buscar times.' });
  }
};

// Retorna um time por ID (removido = false)
exports.getTimeById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      `SELECT * FROM times WHERE id = $1 AND removido = false`,
      [id]
    );
    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Time não encontrado.' });
    }
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error('Erro ao buscar time:', error);
    res.status(500).json({ message: 'Erro ao buscar time.' });
  }
};

// Insere um novo time
exports.insertTime = async (req, res) => {
  const { nome, data_criacao, orcamento } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO times (nome, data_criacao, orcamento) VALUES ($1, $2, $3) RETURNING *`,
      [nome, data_criacao, orcamento]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Erro ao inserir time:', error);
    res.status(500).json({ message: 'Erro ao inserir time.' });
  }
};

// Atualiza um time
exports.updateTime = async (req, res) => {
  const { id } = req.params;
  const { nome, data_criacao, orcamento } = req.body;
  try {
    const result = await pool.query(
      `UPDATE times SET nome = $1, data_criacao = $2, orcamento = $3 WHERE id = $4 RETURNING *`,
      [nome, data_criacao, orcamento, id]
    );
    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Time não encontrado.' });
    }
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error('Erro ao atualizar time:', error);
    res.status(500).json({ message: 'Erro ao atualizar time.' });
  }
};

// Remove logicamente um time (soft delete)
exports.deleteTime = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      `UPDATE times SET removido = true WHERE id = $1 RETURNING *`,
      [id]
    );
    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Time não encontrado.' });
    }
    res.status(200).json({ message: 'Time removido com sucesso.' });
  } catch (error) {
    console.error('Erro ao remover time:', error);
    res.status(500).json({ message: 'Erro ao remover time.' });
  }
};