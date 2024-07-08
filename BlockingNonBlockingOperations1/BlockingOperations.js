const fs = require('fs');

const readFilePath = "./read.txt"
const writeFilePath = "./write.txt"

const startTime = performance.now();

let text = fs.readFileSync(readFilePath);

fs.writeFileSync(writeFilePath, text);

const endTime = performance.now() - startTime;
console.log(`Время выполнения: ${endTime} мс`);