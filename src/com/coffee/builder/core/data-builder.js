/**
 * 测试数据生成器
 * 根据字段类型及长度生成随机测试数据
 */
const tableParser = require("../table-parser");
const dataQueue = require("../queue/dataQueue");
const publicWorker = require('worker_threads');

async function getStructures() {
  let structures = await tableParser.parse();
  console.log(JSON.stringify(structures));
}

/**
 * varchar数据生成器
 */ 
function generateVarchar() {
  return new Promise((resolve,reject)=>{
    console.log('method in ...');
    return new Promise((resolve,reject)=>{
      while(true){
        const worker = new Worker('../../../../builderConfig.json',{name:'myWorker'})
        worker.onmessage((worker,messageEvent)=>{
          console.log(worker,messageEvent);
        })
    } 
    })
  });
}
// generateVarchar();
// console.log('6666');
// getStructures();
generateVarchar()