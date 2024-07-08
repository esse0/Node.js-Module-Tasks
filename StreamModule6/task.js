const fs = require('fs');

const readFilePath = "./read.txt"
const writeFilePath = "./write.txt"

let readStream = fs.createReadStream(readFilePath);
let writeStream = fs.createWriteStream(writeFilePath);

readStream.on('data', (data) => {
    writeStream.write(data);
});
