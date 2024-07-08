const fs = require('fs');

const readFilePath = "./read.txt"
const writeFilePath = "./write.txt"

let readStream = fs.createReadStream(readFilePath);
let writeStream = fs.createWriteStream(writeFilePath);

readStream.pipe(writeStream);