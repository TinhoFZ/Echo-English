const fs = require('fs');

let am, is, are;

try {
    am = fs.readFileSync('../sentences/am.txt', 'utf8');
    is = fs.readFileSync('../sentences/is.txt', 'utf8');
    are = fs.readFileSync('../sentences/are.txt', 'utf8');
} catch(error) {
    console.error('Error reading file', error.message);
}
module.exports = { am, is, are }