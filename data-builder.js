const structures = require('./table-parser');

async function getStructures(){
 let a = await structures();
 console.log(a);
}

getStructures()