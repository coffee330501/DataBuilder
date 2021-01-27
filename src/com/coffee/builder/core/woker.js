const { typeQueueGenerator } = require("../generator/data-generator");
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
const queueAndGenerator = typeQueueGenerator.get(workerData.type);
generator = queueAndGenerator.generator[0];
console.log(`worker: threadId ${threadId} start with ${__filename}`);
console.log(`worker: workerData ${workerData}`);
parentPort.on("message", (msg) => {
  // console.log(`worker: receive ${msg}`);
  // console.log('msg',msg);
  if (msg === 0) {
    process.exit();
  } else if(msg == 1) {
    // console.log('true');
    while (true) {
      // console.log("线程 " + threadId + " 正在生成数据...");
      generator();
      console.log(queueAndGenerator.queue);
    }
  }
});
console.log('worker send msg 1');
parentPort.postMessage(1);
