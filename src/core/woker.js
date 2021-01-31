const { typeGeneratorMap } = require("../generator/data-generator");
const ThreadMsgEnum = require("../enum/thread-enum");
const chalk = require("chalk");
const {query} = require('./config-parser');
const {
  parentPort,
  workerData,
} = require("worker_threads");

/**
 * 根据字段类型获取对应队列和数据生成器
 */
chalk.yellow(
  `工作线程启动...,接收到主线程数据,即将生成${workerData.tableName}表数据`
);
parentPort.on("message", (msg) => {
  if (msg === ThreadMsgEnum.STOP) {
    process.exit();
  } else if (msg == ThreadMsgEnum.START) {
    //获取表的类型
    const fields = workerData.fields;
    //数据生成器列表
    const generators = [];
    for (const {type, notnull, lengthvar} of fields) {
      const genarator = typeGeneratorMap.get(type);
      console.log(genarator,type);
      if(genarator==undefined){
        console.log('===============');
        console.log(type);
      }
      generators.push({genarator,notnull,lengthvar});
    }
    chalk.blueBright("开始生成数据...");
    let generatedDataSize = 0;
    while (generatedDataSize < workerData.dataSize) {
      insertRow(generators,workerData.tableName);
    }
  }
});
parentPort.postMessage(ThreadMsgEnum.START);

//插入一行数据
function insertRow(generators,tableName) {
  let sql = `INSERT INTO ${tableName} VALUES (`;
  let values = '';
  for (const index in generators) {
    if(index!==0){
      values+=',';
    }
    if(Math.random<0.2){
      values+='null';
      continue;
    }
    const genaratorEntity=generators[index];
    const genarator = genaratorEntity.genarator;
    console.log('genarator():'+genarator(100));
    values += genarator(genaratorEntity.lengthvar);
  }
  sql+=values+')';
  query(sql);
}