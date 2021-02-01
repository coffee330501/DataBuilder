var ProgressBar = require('progress');

var len = 100;
var bar = new ProgressBar('progress: [:bar]', { total: len, width: 100, complete: '*' });

var n =0;
while(n<len){
  bar.tick(1);
  n++;
}
// var timer = setInterval(function () {
//   bar.tick(5);  //进度步长
//   if (bar.complete) {
//     console.log('\ncomplete\n');
//     clearInterval(timer);
//   }
// }, 100);