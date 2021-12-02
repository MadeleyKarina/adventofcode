const fs = require('fs');

const DEFAULT_CASE = 2;

function main() {
    const report = readFile("./input.txt")

    switch (DEFAULT_CASE) {
        case 1:
            const result1 = puzzle1(report);
            console.log(result1);
            break;
        case 2:
            const result2 = puzzle2(report);
            console.log(result2);
            break;
        default:
            console.log("Not found");
    }
}


function puzzle1(report) {
    let horizontal = 0;
    let depth = 0;
    for (let i = 0; i < report.length; i++) {
        if(report[i].command === "forward"){
            horizontal += report[i].position;
        }else {
            if(report[i].command === "down"){
                depth += report[i].position;
            }
            else {
                depth -= report[i].position;
            }
        }
    }
    return horizontal*depth;
}

function puzzle2(report) {
    let horizontal = 0;
    let depth = 0;
    let aim = 0;
    for (let i = 0; i < report.length; i++) {
        if(report[i].command === "forward"){
            horizontal += report[i].position;
            depth += (aim * report[i].position);
        }else {
            if(report[i].command === "down"){
                aim += report[i].position;
            }
            else {
                aim -= report[i].position;
            }
        }
    }
    return horizontal*depth;
}

function readFile(dirPath) {
    try {
        const fileReport = fs.readFileSync(dirPath, "utf8");
        const report = fileReport.split("\n").map((line) => {
            const [command, pos] = line.split(" ");
            return {
                command,
                position: Number(pos)
            }
        });
        return report;
    } catch (error) {
        throw error;
    }
}



module.exports = main()
