const dataGenerator = require("../generator/data-generator");
const {
  isMainThread,
  parentPort,
  workerData,
  threadId,
  MessageChannel,
  MessagePort,
  Worker,
} = require("worker_threads");

let generator;
/**
 * 根据字段类型获取对应队列和数据生成器
 */
const typeQueueGenerator = dataGenerator.typeQueueGenerator.get(
  workerData.type
);

generator = typeQueueGenerator.generators[0];
console.log(typeQueueGenerator.generators[0][0][0]);
console.log(`worker: threadId ${threadId} start with ${__filename}`);
console.log(`worker: workerData ${workerData}`);
parentPort.on('message', msg => {
  console.log(`worker: receive ${msg}`);
  if (msg === 5) { process.exit(); }
  parentPort.postMessage(msg);
})

while (true) {
  console.log("线程 " + threadId + " 正在生成数据...");
  generator();
}