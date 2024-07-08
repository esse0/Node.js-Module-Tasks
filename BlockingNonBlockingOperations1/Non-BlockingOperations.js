const fs = require('fs');

const readFilePath = "./read.txt"
const writeFilePath = "./write.txt"

const startTime = performance.now();

let readStream = fs.createReadStream(readFilePath);
let writeStream = fs.createWriteStream(writeFilePath);

readStream.on('data', (data) => {
    writeStream.write(data);
});

const endTime = performance.now() - startTime;
console.log(`Время выполнения: ${endTime} мс`);
    