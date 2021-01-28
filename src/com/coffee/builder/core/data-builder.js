/**
 * 测试数据生成器
 * 根据字段类型及长度生成随机测试数据
 */
const tableParser = require("./table-parser");
const {
  typeQueueGenerator,
  generateNull,
} = require("../generator/data-generator");
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

async function getStructures() {
  try {
    //获取表结构
    const structures = await tableParser.parse();
    // console.log(JSON.stringify(structures));

    const types = new Set();
    for (const table of structures) {
      const tableName = table.tableName;
      for (const structure of table) {
        //structure的格式{"attnum":1,"field":"id","type":"uuid","length":16,"lengthvar":-1,"notnull":true,"comment":null}
        // const length = structure.length;
        const lengthvar = structure.lengthvar - 4; //因为lengthvar比我们定义的长度大4
        const nullable = structure.notnull;
        const type = structure.type;
        const workerData = {
          type,
          nullable,
          lengthvar,
          work: true,
        };
        const worker = new Worker("./woker.js", { workerData });
        worker.on("exit", (code) => {});
        worker.on("message", (msg) => {
          worker.postMessage(1);
        });
      }
    }
  } catch (err) {
    console.log(chalk.redBright(err));
  }
}

getStructures();
