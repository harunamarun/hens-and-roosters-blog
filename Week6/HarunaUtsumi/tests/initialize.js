const config = require("../config");
const knex = require("knex")(config.db);

const ignoreError = () => {
  // do nothing
};

const clearTable = (tableName) => knex(tableName).del().catch(ignoreError);

const tables = ["blogs"];

Promise.all(tables.map(clearTable)).then(process.exit);
