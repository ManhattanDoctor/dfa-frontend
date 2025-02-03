//--------------------------------------------------------------------------
//
// 	Properties
//
//--------------------------------------------------------------------------

if (!process.env.FROM) {
    throw new Error(`Please use FROM env to set directory copy from`);
}
if (!process.env.TO) {
    throw new Error(`Please use TO env to set directory to`);
}

let to = `${process.env.TO}`;
let from = `${process.env.FROM}`;

//--------------------------------------------------------------------------
//
// 	Imports
//
//--------------------------------------------------------------------------

const _ = require('lodash');
const fs = require('fs');

//--------------------------------------------------------------------------
//
// 	Check Files
//
//--------------------------------------------------------------------------

if (!fs.existsSync(from)) {
    console.error(`There is no directory FROM "${from}"`);
    return;
}
if (!fs.existsSync(to)) {
    console.error(`There is no directory TO "${to}"`);
    return;
}

let files = new Array();
for (let name of fs.readdirSync(from)) {
    if(name.split('.')[1] !== 'json') {
        continue;
    }
    let path = `${from}/${name}`;
    if(!fs.lstatSync(path).isFile()) {
        continue;
    }
    files.push({name, path});
}

for(let item of files) {
    fs.copyFileSync(item.path, `${to}/${item.name}`);
}
