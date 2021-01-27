const map = new Map();

class QueueGenerator {
  constructor(queue, ...generator) {
    this.queue = queue;
    this.generator=generator;
  } 
}
map.set('a',new QueueGenerator([],'qweq'));

module.exports={
  map
};