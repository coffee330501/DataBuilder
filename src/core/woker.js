const { typeGeneratorMap } = require("../generator/data-generator");
const ThreadMsgEnum = require("../enum/thread-enum");
const chalk = require("chalk");
const { query } = require("./config-parser");
const { parentPort, workerData } = require("worker_threads");
const ProgressBar = require("progress");

/**
 * 根据字段类型获取对应队列和数据生成器
 */
console.log(
  chalk.yellow(
    `工作线程启动...,接收到主线程数据,即将生成${workerData.tableName}表数据`
  )
);
parentPort.on("message", async (msg) => {
  if (msg === ThreadMsgEnum.STOP) {
    process.exit();
  } else if (msg === ThreadMsgEnum.START) {
    //获取表的类型
    const fields = workerData.fields;
    //数据生成器列表
    const generators = [];
    for (const { type, notnull, lengthvar } of fields) {
      const genarator = typeGeneratorMap.get(type);
      if (genarator === undefined) {
        console.log(chalk.redBright(`type ${type} 的生成器未定义...`));
        process.exit(ThreadMsgEnum.ERROR);
      }
      generators.push({ genarator, notnull, lengthvar });
    }
    console.log(chalk.blueBright("开始生成数据..."));
    let generatedDataSize = 0;
    var bar = new ProgressBar("progress: [:bar]", {
      total: workerData.dataSize,
      width: 100,
      complete: "*",
    });
    while (generatedDataSize < workerData.dataSize) {
      bar.tick(1);
      await insertRow(generators, workerData.tableName);
      generatedDataSize++;
    }
    //parentPort.postMessage(ThreadMsgEnum.FINISH);
  }
});
parentPort.postMessage(ThreadMsgEnum.START);

//插入一行数据
async function insertRow(generators, tableName) {
  let sql = `INSERT INTO ${tableName} VALUES (`;
  let values = "";
  for (const index in generators) {
    if (index != 0) {
      values += ",";
    }
    if (Math.random < 0.2) {
      values += "null";
      continue;
    } else {
      const genaratorEntity = generators[index];
      const genarator = genaratorEntity.genarator;
      values += genarator(genaratorEntity.lengthvar);
    }
  }
  sql += values + ")";
  await query(sql);
}
