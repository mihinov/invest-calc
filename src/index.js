const formSalaryNode = document.querySelector('.form-salary');
const inputSalaryNode = document.querySelector('.input-salary');
const inputProfitabilityNode = document.querySelector('.input-profitability');
const inputSaveSalaryNode = document.querySelector('.input-save-salary');
const formOutputNode = document.querySelector('.form-output');

function parseNum(num) {
	num = Math.round(num);
	let strNum = '';

	if (num === 1000) {
		return '1 000';
	}

	while (num > 1000) {
		let numRight = num % 1000;

		if (numRight === 0) {
			numRight = '000';
		}

		if (numRight < 100 && numRight >= 10) {
			numRight = `0${numRight}`;
		}

		if (numRight > 0 && numRight <= 10) {
			numRight = `00${numRight}`;
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

	if (
		inputSalaryNode.value === '0' ||
		inputProfitabilityNode.value === '0' ||
		inputSaveSalaryNode.value === '0'
	) {
		formOutputNode.innerText = '';
		return false;
	}

	const salary = Number(inputSalaryNode.value);
	const profitabilityPercent = Number(inputProfitabilityNode.value) / 100;
	const saveSalaryPercent = Number(inputSaveSalaryNode.value) / 100;

	const saveSalary = Math.round(salary * saveSalaryPercent); // Сколько отложили за месяц
	const saveSalaryYear = Math.round(saveSalary * 12); // Сколько отложили за год
	const passiveSalaryYear = Math.round(saveSalaryYear * profitabilityPercent); // Пассивный доход в год
	const passiveSalaryMonth = Math.round(passiveSalaryYear / 12); // Пассивный доход в месяц

	formOutputNode.innerHTML = `
		<div class="info">
			<div class="info__item">
				Откладываем в месяц: <span class="white-space-nowrap">${parseNum(saveSalary)}</span>
			</div>
			<div class="info__item">
				Откладываем в год: <span class="white-space-nowrap">${parseNum(saveSalaryYear)}</span>
			</div>
		</div>
	`;

	const salaryArr = calcPassiveSalary({ salary, profitabilityPercent, saveSalaryPercent });
	const tableNode = createTable(salaryArr);

	formOutputNode.appendChild(tableNode);
}

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
	const wrapperTableNode = document.createElement('div');

	tableNode.classList.add('table');
	tableNode.innerHTML = `
		<thead>
			<tr>
				<th>Год</th>
				<th>Отложили <br> в <br>сумме</th>
				<th>Накапало<br> процентов</th>
				<th>Отложили <br>+<br> проценты</th>
				<th>Пассивный<br> доход</th>
			</tr>
		</thead>
	`;

	for (const { year, postponned, percents, capital, passiveSalary } of salaryArr) {
		tbodyNode.innerHTML += `
			<tr>
				<td>${parseNum(year)}</td>
				<td>${parseNum(postponned)}</td>
				<td>${parseNum(percents)}</td>
				<td>${parseNum(capital)}</td>
				<td>${parseNum(passiveSalary)}</td>
			</tr>
		`;
	}

	tableNode.appendChild(tbodyNode);

	wrapperTableNode.classList.add('table-wrapper');
	wrapperTableNode.appendChild(tableNode);

	return wrapperTableNode;
}

calc();

formSalaryNode.addEventListener('submit', (event) => {
	event.preventDefault();

	calc();
});
