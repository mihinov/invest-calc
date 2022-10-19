const formSalaryNode = document.querySelector('.form-salary');
const inputSalaryNode = document.querySelector('.input-salary');
const inputProfitabilityNode = document.querySelector('.input-profitability');
const inputSaveSalaryNode = document.querySelector('.input-save-salary');
const formOutputNode = document.querySelector('.form-output');

formSalaryNode.addEventListener('submit', (event) => {
	event.preventDefault();

	const salary = Number(inputSalaryNode.value);
	const profitabilityPercent = Number(inputProfitabilityNode.value) / 100;
	const saveSalaryPercent = Number(inputSaveSalaryNode.value) / 100;

	const saveSalary = salary * saveSalaryPercent; // Сколько отложили за месяц
	const saveSalaryYear = saveSalary * 12; // Сколько отложили за год
	const passiveSalaryYear = saveSalaryYear * profitabilityPercent; // Пассивный доход в год
	const passiveSalaryMonth = passiveSalaryYear / 12; // Пассивный доход в месяц
	const workYears = 100000 / passiveSalaryMonth; // Сколько лет работать для пассивного дохода в размере зп

	formOutputNode.innerHTML = `
		<div>Откладываем в год: ${saveSalaryYear}</div>
		<div>Пассивный доход в год: ${passiveSalaryYear}</div>
		<div>Пассивный доход в месяц: ${passiveSalaryMonth}</div>
		<div>Чтобы был пассивный доход ${salary}, нужно работать ${workYears.toFixed(1)} лет</div>
	`;

});
