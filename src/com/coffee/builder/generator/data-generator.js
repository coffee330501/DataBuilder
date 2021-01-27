const stringRandom = require("string-random");
const UUID = require("node-uuid");
const dataQueue = require("../queue/dataQueue");

/**
 * 队列和对应的生成器
 */
class QueueGenerator {
  constructor(queue, ...generator) {
    this.queue = queue;
    this.generators = [];
    this.generators.push(generator);
  } 
}
/**
 * 建立类型和队列、生成器的映射关系
 */
const typeQueueGenerator = new Map();
typeQueueGenerator.set('varchar',new QueueGenerator(dataQueue.varcharQueue,generateVarchar));
typeQueueGenerator.set('uuid',new QueueGenerator(dataQueue.uuidQueue,generateUUID_V1,generateUUID_V4));
typeQueueGenerator.set('int4',new QueueGenerator(dataQueue.int4Queue,generateint4));
typeQueueGenerator.set('int8',new QueueGenerator(dataQueue.int8Queue,generateint8));
typeQueueGenerator.set('int8',new QueueGenerator(dataQueue.int8Queue,generateint8));
typeQueueGenerator.set('bool',new QueueGenerator(dataQueue.boolQueue,generatorBool));
typeQueueGenerator.set('json',new QueueGenerator(dataQueue.jsonQueue,generateJson));
typeQueueGenerator.set('date',new QueueGenerator(dataQueue.dateQueue,generateDate));
typeQueueGenerator.set('timestamp',new QueueGenerator(dataQueue.timeStampQueue,generateTimeStamp));
//别名
typeQueueGenerator.set('int',new QueueGenerator(dataQueue.int8Queue,generateint8));
console.log(typeQueueGenerator.get('varchar'));
/**
 * 生产varchar数据
 */
function generateVarchar() {
  dataQueue.varcharQueue.push(stringRandom(Math.random() * 50));
}

/**
 * 生产float8数据，有负数
 */
function generateFloat8() {
  dataQueue.float8Queue.push(
    positiveOrNegative() * Math.random() * Math.pow(2, 32)
  );
}

/**
 * 生产float4数据，有负数
 */
function generateFloat4() {
  dataQueue.float8Queue.push(
    positiveOrNegative() * Math.random() * Math.pow(2, 16)
  );
}

/**
 * 生产int4数据，有负数
 */
function generateint4() {
  dataQueue.float8Queue.push(
    Math.ceil(positiveOrNegative() * Math.random() * Math.pow(2, 16))
  );
}

/**
 * 生产int8数据，有负数
 */
function generateint8() {
  dataQueue.float8Queue.push(
    Math.ceil(positiveOrNegative() * Math.random() * Math.pow(2, 32))
  );
}

/**
 * 基于时间戳生成uuid
 */
function generateUUID_V1() {
  dataQueue.uuidQueue.push(UUID.v1());
}

/**
 * 基于时间戳生成uuid
 */
function generateUUID_V4() {
  dataQueue.uuidQueue.push(UUID.v4());
}

/**
 * 生产随机布尔值
 */
function generatorBool() {
  dataQueue.boolQueue.push(Math.random() > 0.5 ? 1 : 0);
}

/**
 * 生产随机日期
 */
function generateDate() {
  dataQueue.dateQueue.push(new Date(1611671246531 * Math.random() * 2));
}

/**
 * 生产null
 */
function generateNull(queue){
  queue.push(null);
}
/**
 * 生产随机单键值对json
 */
function generateAJson() {
  let jsonStr =
    '{"' +
    stringRandom(Math.random * 10) +
    '":"' +
    stringRandom(Math.random() * 10) +
    '"}';
  dataQueue.jsonQueue.push();
}

/**
 * 生产随机json
 */
function generateJson() {
  //kv键值对个数
  let kvSize = Math.random() * 50;
  let jsonStr = "{";
  for (let i = 0; i < kvSize; i++) {
    jsonStr +=
      '"' +
      stringRandom(Math.random * 10) +
      '":"' +
      stringRandom(Math.random() * 10) +
      '"';
    if (i + 1 < kvSize) {
      jsonStr += ",";
    }
  }
  jsonStr += "}";
  dataQueue.jsonQueue.push(jsonStr);
}

/**
 * 生产随机时间戳
 */
function generateTimeStamp() {
  dataQueue.timeStampQueue.push(new Date(1611671246531 * Math.random() * 2));
}

/**
 * 生产随机正负数
 */
function positiveOrNegative() {
  return Math.random() > 0.5 ? 1 : -1;
}

/**
 * 根据字段类型选择对应生产方法
 */
function generate(type) {
  switch (type) {
    case "varchar":
      generateVarchar();
      break;
    case "uuid":
      generateUUID_V1();
      break;
    case "int8":
    case "int":
      generateint8();
      break;
    case "bool":
      generatorBool();
      break;
    case "json":
      generateJson();
      break;
  }
}

module.exports = {
  typeQueueGenerator,
  generateNull
};
