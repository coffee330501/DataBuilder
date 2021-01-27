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

const worker = new Worker("./woker.js", { workerData: { type: "varchar" } });
worker.on("exit", (code) => {
  console.log(`main: worker stopped with exit code ${code}`);
});
worker.on("message", (msg) => {
  console.log(`main: receive ${msg}`);
  worker.postMessage(1);
});

// async function getStructures() {
//   let structures = await tableParser.parse();
//   console.log(JSON.stringify(structures));
// }

// get
