const fs = require('fs');

const DEFAULT_CASE = 2;

function main() {
    const measurements = readFile("./input.txt")

    switch (DEFAULT_CASE) {
        case 1:
            const result1 = puzzle1(measurements);
            console.log(result1);
            break;
        case 2:
            const result2 = puzzle2(measurements);
            console.log(result2);
            break;
        default:
            console.log("Not found");
    }
}


function puzzle1(measurements) {
    let increased = 0;
    for (let i = 1; i < measurements.length; i++) {
        if (measurements[i] > measurements[i - 1]) {
            increased++;
        }
    }
    return increased;
}

function puzzle2(measurements) {
    let increased = 0;
    let lastSum = Math.max(Number);
    let window = 0;
    let currentSum = 0;
    for (let i = 0; i <= measurements.length; i++) {
        if (window !== 0 && window % 3 === 0) {
            if (currentSum > lastSum) {
                increased += 1;
            }
            window = 0;
            lastSum = currentSum;
            currentSum = 0;
            i = i - 2;
        }
        if (i < measurements.length) {
            window += 1;
            currentSum += measurements[i];
        }
    }
    return increased;
}

function readFile(dirPath) {
    try {
        const fileExpenseReport = fs.readFileSync(dirPath, "utf8");
        const expenseReport = fileExpenseReport.split("\n").map(Number);
        return expenseReport;
    } catch (error) {
        throw error;
    }
}

module.exports = main()
