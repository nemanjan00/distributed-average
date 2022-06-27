module.exports = () => {
	const average = {
		_value: {},
		_count: {},

		setDefaultValue: async (name, num) => {
			if(average._value[name] === undefined) {
				average._value[name] = num;
				average._count[name] = 1;
			}
		},

		addWithCoef: async (name, coef, num) => {
			if(average._value[name] === undefined) {
				return await average.setDefaultValue(name, num);
			}

			average._value[name] = (
				average._value[name] * (coef - 1) + num
			) / coef;

			return average._value[name];
		},

		add: async (name, num) => {
			if(average._value[name] === undefined) {
				return await average.setDefaultValue(name, num);
			}

			average._count[name]++;

			average._value[name] = (
				average._value[name] * (average._count[name] - 1) + num
			) / average._count[name];

			return average._value[name];
		},

		getValue: async (name) => {
			return average._value[name];
		}
	};

	return average;
};
