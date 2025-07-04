export const isValidInteger = (value: unknown) => {
	const valueNumber = Number(value);
	const isNoValid = {
		isValid: false,
		value,
	} as const;
	if (`${valueNumber}` !== value) {
		return isNoValid;
	}
	if (Number.isNaN(valueNumber)) {
		return isNoValid;
	}
	if (Number.isInteger(valueNumber)) {
		return {
			value: valueNumber,
			isValid: true,
		} as const;
	}
	return isNoValid;
};

export const getIntegerOrDefault = (
	value?: unknown,
	defaultValue = Number.NaN,
): number => {
	const valueNumber = Number(value);
	const response = isValidInteger(valueNumber);
	if (response.isValid) {
		return response.value;
	}
	return defaultValue;
};

export default getIntegerOrDefault;

export const getIntegerOrUndefined = (
	value?: unknown,
	defaultValue = Number.NaN,
) => {
	const iord = getIntegerOrDefault(value, defaultValue);
	return iord === defaultValue ||
		(Number.isNaN(iord) && Number.isNaN(defaultValue))
		? undefined
		: iord;
};

/**
 * Return array int not empty or undefined
 */
export const getArrayIntegerFromString = (values: unknown) => {
	if (!values || typeof values !== "string") {
		return undefined;
	}
	const strings = values.split(",");
	const items: number[] = [];
	strings.forEach((value) => {
		const integer = Number.parseInt(value, 10);
		if (!Number.isNaN(integer)) {
			items.push(integer);
		}
	});

	return items.length > 0 ? items : undefined;
};
