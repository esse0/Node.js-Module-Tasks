const fs = require('fs');
const path = require('path');

const directoryPath = './';

fs.readdir(directoryPath, (error, files) => {
    if (error) {
        console.error('Ошибка при чтении директории:', error);
        return;
    }

    console.log(`Файлы в директории: ${files}`);

    files.forEach((file) => {
        if(path.extname(file) === '.txt'){
            fs.unlink(path.join(directoryPath, file), (error) => {
                if (error) {
                    console.error(`Ошибка при удалении файла ${file}:`, error);
                } else {
                    console.log(`Файл ${file} успешно удален`);
                }
            })
        }
    })
})