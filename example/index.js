const average = require("../src")("redis://redis:6379");

(async() => {
	await Promise.all(
		Array(10000)
			.fill(1)
			.map(() => Math.random())
			.map(val => (val > 0.8)?0:1)
			.map(val => average.add("example1", val))
	);

	console.log(await average.getValue("example1"));

	await Promise.all(
		Array(10000)
			.fill(1)
			.map(() => Math.random())
			.map(val => (val > 0.8)?0:1)
			.map(val => average.addWithCoef("example2", 10, val))
	);

	console.log(await average.getValue("example2"));
})();
