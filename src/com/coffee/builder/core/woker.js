const { typeQueueGenerator } = require("../generator/data-generator");
const ThreadMsgEnum = require('../enum/thread-enum');
const chalk = require('chalk');
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
chalk.yellow(`工作线程启动...,接收到主线程数据${workerData}`)
parentPort.on("message", (msg) => {
  if (msg === ThreadMsgEnum.STOP) {
    process.exit();
  } else if(msg == ThreadMsgEnum.START) {
    chalk.blueBright('开始生成数据...')
    while (queueAndGenerator.queue.length<5000) {
      generator();
    }
  }
});
parentPort.postMessage(ThreadMsgEnum.START);
