const Redis = require("ioredis");

module.exports = (url) => {
	const client = new Redis(url);

	const average = {
		addWithCoef: (name, coef, num) => {
			return client.addToAverageWithCoef(`${name}`, num, coef).then(data => {
				return +data[0];
			});
		},

		add: (name, num) => {
			client.addToAverage(name, `${name}:count`, num).then(data => {
				return +data[0];
			});
		},

		getValue: (name) => {
			return client.get(name);
		},

		setValue: (name, num) => {
			return client.set(name,  num);
		},

		getMultiple: (names) => {
			return client.mget(...names);
		}
	};

	client.defineCommand("addToAverage", {
		numberOfKeys: 2,
		lua: `
			local value = redis.call("GET", KEYS[1])
			local count = redis.call("GET", KEYS[2])

			local addValue = tonumber(ARGV[1])

			if not value then
				value = 0
				count = 0
			end

			value = tonumber(value)
			count = tonumber(count)

			local newValue = ((value * count) + addValue) / (count + 1)

			count = count + 1

			redis.call("SET", KEYS[1], newValue)
			redis.call("SET", KEYS[2], count)

			return {tostring(newValue),count}
		`
	});

	client.defineCommand("addToAverageWithCoef", {
		numberOfKeys: 1,
		lua: `
			local value = redis.call("GET", KEYS[1])

			local addValue = tonumber(ARGV[1])
			local coef = tonumber(ARGV[2])

			if not value then
				value = ARGV[1]
			end

			value = tonumber(value)

			local newValue = ((value * (coef - 1)) + addValue) / coef

			redis.call("SET", KEYS[1], newValue)

			return {tostring(newValue)}
		`
	});

	return average;
};
