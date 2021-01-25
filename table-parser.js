const configParser = require("./config-parser");

/**
 * 解析表结构
 */
async function parsePostgresql() {
  let structures = {};
  for (const tableName of configParser.tables) {
    let structure = await configParser.query(`SELECT A
    .attnum,
    A.attname AS field,
    T.typname AS TYPE,
    A.attlen AS LENGTH,
    A.atttypmod AS lengthvar,
    A.attnotnull AS NOTNULL,
    b.description AS COMMENT 
  FROM
    pg_class C,
    pg_attribute
    A LEFT OUTER JOIN pg_description b ON A.attrelid = b.objoid 
    AND A.attnum = b.objsubid,
    pg_type T 
  WHERE
    C.relname = '${tableName}'
    AND A.attnum > 0 
    AND A.attrelid = C.oid 
    AND A.atttypid = T.oid 
  ORDER BY
    A.attnum;`);
    structures.tableName = structure;
  }
  return structures;
}


module.exports = parsePostgresql;
