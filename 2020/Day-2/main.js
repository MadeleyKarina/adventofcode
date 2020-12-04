const fs = require("fs");

const DEFAULT_CASE = 1;

function main() {
    const passwords = readFile("./input.txt");

    switch (DEFAULT_CASE) {
        case 1:
            const result1 = getOldValidPasswords(passwords);
            console.log(result1);
            break;
        case 2:
            const result2 = getNewValidPasswords(passwords);
            console.log(result2);
            break;
        default:
            console.log("Not found");
    }
}

function getNewValidPasswords(passwords) {
    let validCount = 0;
    for (let i = 0; i < passwords.length; i++) {
        const limits = passwords[i][0].split("-").map(Number);
        const letter = passwords[i][1].replace(/\:/g, "")
        const password = passwords[i][2];
        const isValid = validNewPassword(password, letter, limits);
        if (isValid) {
            validCount++;
        }
    }
    return validCount
}

function validNewPassword(password, letter, limits) {
    const firstLimit = limits[0] - 1;
    const secondLimit = limits[1] - 1;
    if ((password[firstLimit] === letter && password[secondLimit] === letter) ||
        (password[firstLimit] !== letter && password[secondLimit] !== letter)) {
        return false;
    }
    return true;
}

function getOldValidPasswords(passwords) {
    let validCount = 0;
    for (let i = 0; i < passwords.length; i++) {
        const limits = passwords[i][0].split("-").map(Number);
        const letter = passwords[i][1].replace(/\:/g, "")
        const password = passwords[i][2];
        const countedLetter = countChars(password, letter);
        if (countedLetter >= limits[0] && countedLetter <= limits[1]) {
            validCount++;
        }
    }
    return validCount;
}

function countChars(password, letter) {
    const count = [...password].filter(passLetter => passLetter === letter).length;
    return count;
}

function readFile(dirPath) {
    try {
        const fileExpenseReport = fs.readFileSync(dirPath, "utf8");
        const expenseReport = fileExpenseReport.split("\n").map((line) => line.split(" "));
        return expenseReport;
    } catch (error) {
        throw error;
    }
}

module.export = main();
