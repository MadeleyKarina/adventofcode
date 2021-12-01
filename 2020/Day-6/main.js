const fs = require('fs');

const DEFAULT_CASE = 2;

function main() {
    const fileCustoms = readFile('./input.txt');
    switch (DEFAULT_CASE) {
        case 1:
            const result1 = answerSum(fileCustoms);
            console.log(result1);
            break;
        case 2: 
            const result2 = answerEquals(fileCustoms);
            console.log(result2);
            break;
        default:
            console.log('Not found');
    }
}

function answerSum(customsGroup) {
    const uniqueCustoms = customsGroup.map(customs => new Set(customs.join('')));
    let sum = 0
    uniqueCustoms.map(uniqueCustom => { 
        return sum += uniqueCustom.size
    })
    return sum;
}

function answerEquals(customsGroup) {
    const uniqueCustoms = customsGroup.map(customs => new Set(customs.join('')));
    const intersect = new Set();
    for (let custom of uniqueCustoms){
        for (let item of custom ){
            intersect.has()
        }
    }

    console.log(uniqueCustoms)
}

function readFile(dirPath) {
    try {
        const fileCustoms = fs.readFileSync(dirPath, 'utf8');
        const customs = fileCustoms.split('\n\n');
        const customsGroup = customs.map(group => group.split("\n"));
        return customsGroup;
    } catch (error) {
        throw error;
    }
}

module.exports = main();