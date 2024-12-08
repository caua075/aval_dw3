const pool = require('../../../database/databaseConfig');

exports.getTimeCampeonato = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT * FROM times_campeonatos`
    );
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Erro ao buscar times_campeonatos:', error);
    res.status(500).json({ message: 'Erro ao buscar times_campeonatos.' });
  }
}

exports.getTimeCampeonatoById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      `SELECT * FROM times_campeonatos WHERE id = $1`,
      [id]
    );
    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Times_Campeonatos não encontrado.' });
    }
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error('Erro ao buscar times_campeonatos:', error);
    res.status(500).json({ message: 'Erro ao buscar times_campeonatos.' });
  }
}

exports.insertTimeCampeonato = async (req, res) => {
    const { time_id, campeonato_id } = req.body;
    try {
        const result = await pool.query(
        `INSERT INTO times_campeonatos (time_id, campeonato_id) VALUES ($1, $2) RETURNING *`,
        [time_id, campeonato_id]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Erro ao inserir times_campeonatos:', error);
        res.status(500).json({ message: 'Erro ao inserir times_campeonatos.' });
    }
}

exports.updateTimeCampeonato = async (req, res) => {
    const { id } = req.params;
    const { time_id, campeonato_id } = req.body;
    try {
        const result = await pool.query(
        `UPDATE times_campeonatos SET time_id = $1, campeonato_id = $2 WHERE id = $3 RETURNING *`,
        [time_id, campeonato_id, id]
        );
        res.status(200).send('Requisição PUT recebida');
        if (result.rowCount === 0) {
        return res.status(404).json({ message: 'Times_Campeonatos não encontrado.' });
        }
        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error('Erro ao atualizar times_campeonatos:', error);
        res.status(500).json({ message: 'Erro ao atualizar o times_campeonatos.' });
    }
}

exports.deleteTimeCampeonato = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query(
        `DELETE FROM times_campeonatos WHERE id = $1`,
        [id]
        );
        if (result.rowCount === 0) {
        return res.status(404).json({ message: 'Times_Campeonatos não encontrado.' });
        }
        res.status(204).json();
    } catch (error) {
        console.error('Erro ao deletar times_campeonatos:', error);
        res.status(500).json({ message: 'Erro ao deletar times_campeonatos.' });
    }
}
