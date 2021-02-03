/**
 * 测试数据生成器
 * 根据字段类型及长度生成随机测试数据
 */
const tableParser = require("./table-parser");
const { config, close } = require("./config-parser");
const { Worker } = require("worker_threads");
const ThreadMsgEnum = require("../enum/thread-enum");
const chalk = require("chalk");

async function distributeTask() {
  try {
    //获取表结构
    const structures = await tableParser.parse();
    //生成数据
    for (const table of structures) {
      const tableName = table.tableName;
      //存储表中的所有字段
      const fields = [];
      //配置文件中的自定义field
      const customFields = config.custom.fields;
      for (const { field, type, notnull, lengthvar } of table.structure) {
        //structure的格式{"attnum":1,"field":"id","type":"uuid","length":16,"lengthvar":-1,"notnull":true,"comment":null}
        //因为lengthvar比我们定义的长度大4
        const transField = new TransField(type, notnull, lengthvar - 4); //向worker传递的字段信息
        transField.custome = customFields[field];
        console.log(customFields[field]);
        fields.push(transField);
      }

      //传给工作线程的数据
      const workerData = {
        tableName,
        fields,
        dataSize: config.dataSize,
      };
      const worker = new Worker(`${process.cwd()}/core/woker.js`, {
        workerData,
      });
      worker.on("exit", (code) => {
        if (code === ThreadMsgEnum.ERROR) {
          console.log(chalk.redBright("异常退出..."));
        } else {
          console.log(chalk.greenBright("插入成功..."));
        }
        close();
        process.exit();
      });
      worker.on("message", (msg) => {
        if (msg === ThreadMsgEnum.FINISH) {
          worker.postMessage(ThreadMsgEnum.STOP);
        }
      });
      worker.postMessage(ThreadMsgEnum.START);
    }
  } catch (err) {
    console.log(
      chalk.redBright(
        "An error occurred at file distribute-task.js function distributeTask() \n",
        chalk.redBright(err)
      )
    );
  }
}
class TransField {
  type;
  notnull;
  lengthvar;
  custome; //json 格式按配置文件中单个字段的自定义配置
  constructor(type, notnull, lengthvar) {
    this.type = type;
    this.notnull = notnull;
    this.lengthvar = lengthvar;
  }
  setCustome(custome) {
    this.custome = custome;
  }
}

module.exports = distributeTask;
