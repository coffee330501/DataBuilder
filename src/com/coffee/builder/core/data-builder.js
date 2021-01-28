/**
 * 测试数据生成器
 * 根据字段类型及长度生成随机测试数据
 */
const tableParser = require("./table-parser");
const dataQueue = require("../queue/dataQueue");
const {
  isMainThread,
  parentPort,
  workerData,
  threadId,
  MessageChannel,
  MessagePort,
  Worker,
} = require("worker_threads");
const chalk = require("chalk");

// const worker = new Worker("./woker.js", { workerData: { type: "varchar" } });
// worker.on("exit", (code) => {
//   console.log(`main: worker stopped with exit code ${code}`);
// });
// worker.on("message", (msg) => {
//   console.log(`main: receive ${msg}`);
//   worker.postMessage(1);
// });

async function getStructures() {
  try{
  let structures = await tableParser.parse();
  console.log(chalk.green(structures.tableName));
  //row的格式{"attnum":1,"field":"id","type":"uuid","length":16,"lengthvar":-1,"notnull":true,"comment":null}
  for (const row of structures.structure.rows) {
    var length = row.length;
    var lengthvar = row.lengthvar-4; //因为lengthvar比我们定义的长度大4
    var nullable = row.notnull;
    console.log(chalk.blueBright(JSON.stringify(row)));
    console.log(chalk.yellow('----------------------'));
  }
}catch(err){
  console.log(err);
}
}

getStructures()