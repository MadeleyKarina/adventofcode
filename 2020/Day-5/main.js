const fs = require('fs');

const DEFAULT_CASE = 1;

function main() {
    const seatReport = readFile('./input.txt');
    switch (DEFAULT_CASE) {
        case 1:
            const result1 = getMaxSeatId(seatReport);
            console.log(result1);
            break;
        case 2:
            const result2 = findMissedSeat(seatReport);
            console.log(result2);
            break;
        default:
            console.log("Nor Found");
    }

}

function findMissedSeat(seatReport) {
    const seatIds = getSeatsID(seatReport);
    const sortedIndex = seatIds.sort((a, b) => a - b);
    for (let i = 1; i < sortedIndex.length - 1; i++) {
        if (sortedIndex[i - 1] + 1 !== sortedIndex[i]) {
            return sortedIndex[i - 1] + 1;
        }
    }
    return 0;
}

function getSeatsID(seatReport) {
    const seatsNumber = seatReport.map(seatCodes => {
        let seatBinary = "";
        for (const c of seatCodes) {
            if (c === "F" || c === "L") {
                seatBinary = seatBinary + "0";
            }
            else {
                seatBinary = seatBinary + "1";
            }
        };
        const seatID = parseInt(seatBinary, 2);
        return seatID;
    })
    return seatsNumber;
}

function getMaxSeatId(seatReport) {
    const seatIds = getSeatsID(seatReport);
    return Math.max(...seatIds)
}

function readFile(dirPath) {
    try {
        const fileReport = fs.readFileSync(dirPath, 'utf8');
        const seatReport = fileReport.split("\n");
        return seatReport;
    } catch (error) {
        throw error;
    }
}

module.exports = main()
