const fs = require('fs');
const readline = require('readline');

const score = document.querySelector('#score');
const highScore = document.querySelector('#high-score');
const sentence = document.querySelector ('#sentence');
const options = document.querySelector('#options');

async function readRandomLine(file, lineNumber) {
    const rl = readline.createInterface({
        input: fs.createReadStream(file),
        crlfDelay: Infinity
    });

    let count = 0;
    for await (const line of rl) {
        count++;
        if (count == lineNumber) {
            rl.close();
            return line;
        }
    }
}
readLine('sentences/am.txt', 1).then(console.log);