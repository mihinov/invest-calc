const formSalaryNode = document.querySelector('.form-salary');
const inputSalaryNode = document.querySelector('.input-salary');
const inputProfitabilityNode = document.querySelector('.input-profitability');
const inputSaveSalaryNode = document.querySelector('.input-save-salary');
const formOutputNode = document.querySelector('.form-output');

function parseNum(num) {
	num = Math.round(num);
	let strNum = '';

	while (num > 1000) {
		let numRight = num % 1000;

		if (numRight === 0) {
			numRight = '000';
		}
		num = Math.floor(num / 1000);
		strNum = `${numRight} ${strNum}`;
	}

	strNum = `${num} ${strNum}`;

	return strNum;
}

function validateInput(event) {
	const inputNode = event.target;

	if (!inputNode.checkValidity()) {
		const num = Number(inputNode.value);
		const min = Number(inputNode.min)
		const max = Number(inputNode.max);

		const distanceMax = Math.abs(num - min);
		const distanceMin = Math.abs(num - max);

		if (distanceMax >= distanceMin) {
			inputNode.value = inputNode.max;
		} else {
			inputNode.value = inputNode.min;
		}
	}
}

function calc() {
	const salary = Number(inputSalaryNode.value);
	const profitabilityPercent = Number(inputProfitabilityNode.value) / 100;
	const saveSalaryPercent = Number(inputSaveSalaryNode.value) / 100;

	const saveSalary = Math.round(salary * saveSalaryPercent); // Сколько отложили за месяц
	const saveSalaryYear = Math.round(saveSalary * 12); // Сколько отложили за год
	const passiveSalaryYear = Math.round(saveSalaryYear * profitabilityPercent); // Пассивный доход в год
	const passiveSalaryMonth = Math.round(passiveSalaryYear / 12); // Пассивный доход в месяц

	formOutputNode.innerHTML = `
		<div>
			Откладываем в месяц: <span class="white-space-nowrap">${parseNum(saveSalary)}</span>
		</div>
		<div>
			Откладываем в год: <span class="white-space-nowrap">${parseNum(saveSalaryYear)}</span>
		</div>
	`;

	const salaryArr = calcPassiveSalary({ salary, profitabilityPercent, saveSalaryPercent });
	const tableNode = createTable(salaryArr);

	formOutputNode.appendChild(tableNode);
}

[
	inputSalaryNode,
	inputProfitabilityNode,
	inputSaveSalaryNode
].forEach(node => {
	node.addEventListener('input', (event) => {
		validateInput(event);
		calc();
	});
});

calc();

function calcPassiveSalary({ salary, profitabilityPercent, saveSalaryPercent }) {
	const saveSalaryMonth = Math.round(salary * saveSalaryPercent * 12);
	let capital = saveSalaryMonth * (1 + profitabilityPercent);
	let passiveSalary = Math.round((capital / 12) * profitabilityPercent);
	let postponned = saveSalaryMonth;
	let percents = Math.round(postponned * profitabilityPercent);

	const resultArr = [
		{ year: 1, postponned, percents, capital, passiveSalary }
	];

	for (let year = 2; passiveSalary < salary; year++) {
		capital = Math.round((capital + saveSalaryMonth) * (1 + profitabilityPercent));
		percents = Math.round((capital - (saveSalaryMonth * year)));
		passiveSalary = Math.round((capital / 12) * profitabilityPercent);
		postponned += saveSalaryMonth;
		resultArr.push({ year, postponned, percents, capital, passiveSalary });
	}

	return resultArr;
}

function createTable(salaryArr) {
	const tableNode = document.createElement('table');
	const tbodyNode = document.createElement('tbody');

	tableNode.classList.add('table');
	tableNode.innerHTML = `
		<thead>
			<tr>
				<th>Год</th>
				<th>Отложили в сумме</th>
				<th>Накапало процентов</th>
				<th>Отложили + проценты</th>
				<th>Пассивный доход</th>
			</tr>
		</thead>
	`;

	for (const { year, postponned, percents, capital, passiveSalary } of salaryArr) {
		tbodyNode.innerHTML += `
			<tr>
				<td>${year}</td>
				<td>${postponned}</td>
				<td>${percents}</td>
				<td>${capital}</td>
				<td>${passiveSalary}</td>
			</tr>
		`;
	}

	tableNode.appendChild(tbodyNode);

	return tableNode;
}


console.log(calcPassiveSalary({ salary: 100000, profitabilityPercent: 0.2, saveSalaryPercent: 0.2 }));
