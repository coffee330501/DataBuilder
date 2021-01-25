/**
 * 测试数据生成器
 * 根据字段类型及长度生成随机测试数据
 */
const tableParser = require("./table-parser");
const dataQueue = require("./queue/dataQueue");

async function getStructures() {
  let structures = await tableParser.parse();
  console.log(JSON.stringify(structures));
}

/**
 * varchar数据生成器
 */
async function generateVarchar() {
  console.log('generateVarchar');
  while(true){

  }
}
generateVarchar()
console.log(1);





getStructures();
