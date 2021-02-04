const stringRandom = require("string-random");
const UUID = require("node-uuid");

/**
 * 建立类型和队列、生成器的映射关系
 */
const typeGeneratorMap = new Map();
typeGeneratorMap.set('varchar',generateVarchar);
typeGeneratorMap.set('uuid',generateUUID_V4);
typeGeneratorMap.set('int4',generateint4);
typeGeneratorMap.set('int8',generateint8);
typeGeneratorMap.set('float4',generateFloat4);
typeGeneratorMap.set('float8',generateFloat8);
typeGeneratorMap.set('bool',generatorBool);
typeGeneratorMap.set('json',generateJson);
typeGeneratorMap.set('date',generateDate);
typeGeneratorMap.set('timestamp',generateTimeStamp);
typeGeneratorMap.set('timestamptz',generateTimeStamp);
//别名
typeGeneratorMap.set('int',generateint8);
typeGeneratorMap.set('numeric',generateNumeric);
/**
 * 生产varchar数据
 */
function generateVarchar(length) {
  return surroundWithMark(stringRandom(Math.random(length)));
}

/**
 * 生产float8数据，有负数
 */
function generateFloat8() {
  return positiveOrNegative() * Math.random() * Math.pow(2, 32);
}

/**
 * 生产float4数据，有负数
 */
function generateFloat4() {
  return positiveOrNegative() * Math.random() * Math.pow(2, 16);
}

/**
 * 生产int4数据，有负数
 */
function generateint4() {
  return Math.ceil(positiveOrNegative() * Math.random() * Math.pow(2, 16));
}

/**
 * 生产int8数据，有负数
 */
function generateint8() {
  return Math.ceil(positiveOrNegative() * Math.random() * Math.pow(2, 32));
}

/**
 * 基于时间戳生成uuid
 */
function generateUUID_V1() {
  return surroundWithMark(UUID.v1());
}

/**
 * 基于时间戳生成uuid
 */
function generateUUID_V4() {
  return surroundWithMark(UUID.v4());
}

/**
 * 生产随机布尔值
 */
function generatorBool() {
  return Math.random() > 0.5 ? "'t'" : "'f'";
}

/**
 * 生产 NUMERIC 
 */
//TODO 修改实现
function generateNumeric() {
  return Math.random()*8192;
}

/**
 * 生产随机日期
 */
function generateDate() {
  return surroundWithMark(new Date(1611671246531 * Math.random() * 2).toLocaleDateString());
}

/**
 * 生产null
 */
function generateNull(){
  return null;
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
  return surroundWithMark(jsonStr);
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
  return surroundWithMark(jsonStr);
}

/**
 * 生产随机时间戳
 */
function generateTimeStamp() {
  return surroundWithMark(new Date(1611671246531 * Math.random() * 2).toLocaleDateString())
}

/**
 * 生产随机正负数
 */
function positiveOrNegative() {
  return Math.random() > 0.5 ? 1 : -1;
}
/**
 * 使用引号包围数据
 */
function surroundWithMark(data,mark="'"){
  return mark+data+mark;
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
  typeGeneratorMap,
  generateNull
};
