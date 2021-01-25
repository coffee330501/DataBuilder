/**
 * 配置解析器
 */
const fs = require("fs");
const { Pool } = require("pg");

let tables = "";
let sqlType = [];

const builderConfig = JSON.parse(
  fs.readFileSync("../../../../builderConfig.json", "utf-8")
);

tables = builderConfig.tables;
sqlType = builderConfig.SQLType;

const pool = new Pool({
  user: builderConfig.user,
  password: builderConfig.password,
  host: builderConfig.host,
  port: builderConfig.port,
  database: builderConfig.database,
});

/**
 * 查询
 */
function query(sql, params) {
  return pool.query(sql, params);
}

/**
 * 关闭连接池
 */
function close() {
  pool.close();
}

module.exports = {
  query,
  tables,
  sqlType,
};
