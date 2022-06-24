module.exports = () => {
	const average = {
		_coefficient: undefined,
		_value: undefined,
		_count: 0,

		setCoefficient: async (num) => {
			average._coefficient = num;
		},

		setDefaultValue: async (num) => {
			if(average._value === undefined) {
				average._value = num;
				average._count = 1;
			}
		},

		add: async (num) => {
			if(average._value === undefined) {
				return await average.setDefaultValue(num);
			}

			if(average._coefficient) {
				average._value = (
					average._value * (average._coefficient - 1) + num
				) / average._coefficient;

				console.log(num, average._value);

				return average._value;
			}

			average._count++;

			average._value = (
				average._value * (average._count - 1) + num
			) / average._count;

			return average._value;
		},

		getValue: async () => {
			return average._value;
		}
	};

	return average;
};
