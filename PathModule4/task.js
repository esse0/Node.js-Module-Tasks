const path = require('path');

let userPath = process.argv[2];

if(!userPath){ console.error('Bad arguments'); return;}

console.log(`File directory: ${path.dirname(userPath)}, file extension: ${path.extname(userPath)}`);