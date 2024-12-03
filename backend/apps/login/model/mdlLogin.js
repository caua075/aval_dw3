const pool = require('../../../database/databaseConfig');

const GetCredencial = async (loginPar) => {
  return (
    await pool.query(
      "select username, password " +
        "from usuarios where username = $1 and deleted = false",
      [loginPar]
    )
  ).rows;
};

module.exports = {
  GetCredencial,
};
