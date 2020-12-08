const fs = require("fs");

const DEFAULT_CASE = 1;

function main() {
    const map = readFile("./input.txt");

    switch (DEFAULT_CASE) {
        case 1:
            const result0 = countTrees(map, 3, 1);
            console.log(result0);
            break;
        case 2:
            const result1 = countTrees(map, 3, 1);
            const result2 = countTrees(map, 1, 1);
            const result3 = countTrees(map, 5, 1);
            const result4 = countTrees(map, 7, 1);
            const result5 = countTrees(map, 1, 2);
            console.log(result1*result2*result3*result4*result5);
            break;
        default: 
            console.log("Not foind");
    }
}

function countTrees(map, pointX, pointY) {
    const x = map[0].length;
    const y = map.length;
    let startedPointX = pointX;
    let startedPointY = pointY;
    let trees = 0;
    while (startedPointY < y) {
        if (map[startedPointY][startedPointX] === "#") {
            trees += 1;
        }
        startedPointX += pointX;
        if (startedPointX >= x) {
            startedPointX = startedPointX - x;
        }
        startedPointY += pointY;
    }
    return trees;
}

function readFile(dirPath) {
    try {
        const fileExpenseReport = fs.readFileSync(dirPath, "utf8");
        const expenseReport = fileExpenseReport.split("\n");
        return expenseReport;
    } catch (error) {
        throw error;
    }
}

module.export = main();
