const fs = require('fs');

const DEFAULT_CASE = 1;

function main() {
	const expenseReport = readFile("./input.txt")

	switch (DEFAULT_CASE) {
		case 1:
			const result1 = puzzle1(expenseReport);
			console.log(result1);
			break;
		case 2:
			const result2 = puzzle2(expenseReport);
			console.log(result2);
			break;
		default:
			console.log("Not found");
	}
}

function puzzle2(expenseReport) {
	const totalValue = 2020;
	const sortedInput = sortInput(expenseReport)
	for (let i = 0; i < sortedInput.length; i++) {
		let inputStart = i + 1;
		let inputFinish = sortedInput.length - 1;
		const diffTotalValue = totalValue - sortedInput[i];
		const entries = findTwoEntries(inputStart, inputFinish, sortedInput, diffTotalValue);
		if (entries === 0) {
			continue;
		}
		const sum = entries.firstValue + entries.secondValue + sortedInput[i];
		if (sum === totalValue) {
			return entries.firstValue * entries.secondValue * sortedInput[i];
		}
	}
	return "NOT FOUND";
}

function puzzle1(expenseReport) {
	const totalValue = 2020;
	const sortedInput = sortInput(expenseReport)
	let inputStart = 0;
	let inputFinish = sortedInput.length - 1;
	const entries = findTwoEntries(inputStart, inputFinish, sortedInput, totalValue);
	if (entries === 0) {
		return "NOT FOUND";
	}
	return entries.firstValue * entries.secondValue;
}

function findTwoEntries(indexStart, indexFinish, sortedInput, totalValue) {
	let sum = 0;
	while (sum !== totalValue && indexStart < indexFinish) {
		sum = sortedInput[indexStart] + sortedInput[indexFinish];
		if (sum === totalValue) {
			return {
				firstValue: sortedInput[indexStart],
				secondValue: sortedInput[indexFinish]
			};
		}
		if (sum < totalValue) {
			indexStart += 1;
		} else {
			indexFinish -= 1;
		}
	}
	return 0;
}

function sortInput(report) {
	const sortedInput = report.sort((a, b) => a - b);
	return sortedInput;
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
