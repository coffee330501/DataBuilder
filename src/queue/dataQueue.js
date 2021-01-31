/**
 * 测试数据暂存队列
 */
const uuidQueue = [];
const int8Queue = [];
const int4Queue = [];
const boolQueue = [];
const jsonQueue = [];
const timeStampQueue = [];
const dateQueue = [];
const float4Queue = [];
const float8Queue = [];

const varcharQueue = new FlexibleLengthQueue();
class FlexibleLengthQueue{
  constructor() {
    return [];
  }
}

module.exports = {
  varcharQueue,
  uuidQueue,
  int8Queue,
  int4Queue,
  boolQueue,
  jsonQueue,
  timeStampQueue,
  dateQueue,
  float4Queue,
  float8Queue,
  FlexibleLengthQueue
};
