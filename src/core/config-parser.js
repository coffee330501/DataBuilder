/**
 * 配置解析器
 */
const fs = require("fs");
const { Pool } = require("pg");
const path = require('path');
let tables = [];
let sqlType = [];
// let PUBLIC_PATH = path.resolve(__dirname, 'builderConfig.json');
const config = JSON.parse(
  fs.readFileSync(path.join(__dirname,'../../config.json') , "utf-8")
);

tables = config.tables;
sqlType = config.SQLType;

const pool = new Pool({
  user: config.user,
  password: config.password,
  host: config.host,
  port: config.port,
  database: config.database,
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
  config,
  close
};
