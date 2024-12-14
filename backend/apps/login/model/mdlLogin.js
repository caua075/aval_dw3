const pool = require('../../../database/databaseConfig');

const GetCredencial = async (loginPar) => {
  console.log("Buscando credenciais para:", loginPar);
  try {
    const result = await pool.query(
      "SELECT username, password FROM usuarios WHERE username = $1 AND deleted = false",
      [loginPar]
    );
    console.log("Credenciais encontradas:", result.rows);
    return result.rows;
  } catch (error) {
    console.error('Erro ao acessar o banco de dados:', error);
    throw error;
  }
};

module.exports = {
  GetCredencial,
};
