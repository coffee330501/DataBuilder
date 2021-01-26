/**
 * 测试数据生成器
 * 根据字段类型及长度生成随机测试数据
 */
const tableParser = require("./table-parser");
const dataQueue = require("../queue/dataQueue");
const publicWorker = require('worker_threads');

let typeMap = new Map();

async function getStructures() {
  let structures = await tableParser.parse();
  console.log(JSON.stringify(structures));
}

// get
