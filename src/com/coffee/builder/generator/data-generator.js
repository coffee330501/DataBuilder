const stringRandom = require('string-random');
const UUID = require('node-uuid');
const dataQueue = require('../queue/dataQueue');

/**
 * 生产varchar数据
 * @param {长度} length 
 */
function generateVarchar(length){
  dataQueue.varcharQueue.push(stringRandom(length));
}

/**
 * 生产float8数据，有负数
 */
function generateFloat8(){
  dataQueue.float8Queue.push(positiveOrNegative()*Math.random()*Math.pow(2,24));
}

/**
 * 生产float4数据，有负数
 */
function generateFloat4(){
  dataQueue.float8Queue.push(positiveOrNegative()*Math.random()*Math.pow(2,24));
}

/**
 * 基于时间戳生成uuid
 */
function generateUUID_V1(){
  dataQueue.uuidQueue.push(UUID.v1());
}

/**
 * 基于时间戳生成uuid
 */
function generateUUID_V4(){
  dataQueue.uuidQueue.push(UUID.v4());
}
function generatorBool(){
  dataQueue.boolQueue.push(Math.random()>0.5?1:0)
}

/**
 * 生产随机正负数
 */
function positiveOrNegative(){
  return Math.random()>0.5?1:-1;
} 
generatorBool()
console.log(dataQueue);