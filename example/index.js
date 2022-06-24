const average = require("../src")();

(async() => {
	await average.setCoefficient(2);

	await Promise.all(
		Array(10000)
			.fill(1)
			.map(() => Math.random())
			.map(val => (val > 0.8)?0:1)
			.map(val => average.add(val))
	);

	console.log(await average.getValue());
})();
