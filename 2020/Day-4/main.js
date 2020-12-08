const fs = require("fs");

const DEFAULT_CASE = 1;

const DEFAULT_ECL = ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"];

const passportDataPattern = {
    byr: "Birth Year",
    iyr: "Issue Year",
    eyr: "Expiration Year",
    hgt: "Height",
    hcl: "Hair Color",
    ecl: "Eye Color",
    pid: "Passport ID",
    cid: "Country ID"
}
const dataPattern = Object.keys(passportDataPattern);

function main() {
    const batchFile = readFile("./input.txt");

    switch (DEFAULT_CASE) {
        case 1:
            const result1 = getValidPassports(batchFile, false);
            console.log(result1);
            break;
        case 2:
            const result2 = getValidPassports(batchFile, true);
            console.log(result2);
            break;
        default:
            console.log("Not found");
    }

}

function getValidPassports(passports, verifiedRules) {
    let validPassports = 0;
    passports.forEach((passportData) => {
        if (verifiedPassports(passportData, verifiedRules)) {
            validPassports += 1;
        }
    })
    return validPassports
}

function verifiedPassports(passportData, verifiedRules) {
    const passportKeys = Object.keys(passportData);
    const patternMap = { ...passportDataPattern };
    patternMap["cid"] = 1;
    for (i = 0; i < passportKeys.length; i++) {
        const data = {
            key: passportKeys[i],
            value: passportData[passportKeys[i]]
        }
        const validData =  verifiedRules ? rules(data) : true;
        if (patternMap[passportKeys[i]] !== undefined && validData) {
            patternMap[passportKeys[i]] = 1;
        }
        else {
            patternMap[passportKeys[i]] = 0;
        }
    }
    const sum = Object.values(patternMap).reduce((a, b) => a + b, 0);
    if (sum === dataPattern.length) {
        return true;
    }
    return false;
}

function rules(data) {
    switch (data.key) {
        case "byr":
            if (Number(data.value) >= 1920 && Number(data.value) <= 2002) {
                return true
            }
            return false;
        case "iyr":
            if (Number(data.value) >= 2010 && Number(data.value) <= 2020) {
                return true;
            }
            return false;
        case "eyr":
            if (Number(data.value) >= 2010 && Number(data.value) <= 2030) {
                return true;
            }
            return false;
        case "hgt":
            const value = data.value;
            const measure = value.slice(value.length - 2);
            const height = Number(value.slice(0, value.length - 2));
            if (measure === "cm") {
                if (height >= 150 && height <= 193) {
                    return true;
                }
            }
            if (measure === "in") {
                if (height >= 59 && height <= 76) {
                    return true;
                }
            }
            return false
        case "hcl":
            return /^#[a-f0-9]{6}$/.test(data.value);
        case "ecl":
            return DEFAULT_ECL.includes(data.value);
        case "pid":
            return /^[0-9]{9}$/.test(data.value);
        case "cid":
            return true;
        default:
            return false;
    }
}

function readFile(dirPath) {
    try {
        const batchFile = fs.readFileSync(dirPath, "utf8");
        const passportsBatchFile = batchFile.split("\n\n")
        const passportsFiles = passportsBatchFile.map(passport => passport.replace(/\n/g, " ").split(" "))
        const passportsObject = [];
        passportsFiles.forEach((passportInformation, index) => {
            const passportDataObject = {};
            passportInformation.map(passport => {
                const passportData = passport.split(":");
                passportDataObject[passportData[0]] = passportData[1];
            })
            passportsObject.push(passportDataObject);
        });
        return passportsObject;
    } catch (error) {
        throw error;
    }
}

module.export = main();
