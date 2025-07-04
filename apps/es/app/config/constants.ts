export interface ENVValues {
	siteUrl: string;
	brevoKey: string;
	brevoUrl: string;
	brevoListId: string;
}

const getValue = (env: ENVValues, key: keyof ENVValues) => {
	const value = env[key];
	if (!value) {
		throw new Error(`${key} is required in .env file.`);
	}
	return value;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getConfig = (allEnv: any) => {
	const env = allEnv.public as unknown as ENVValues;
	const config = {
		siteUrl: getValue(env, "siteUrl"),
		brevo: {
			key: atob(getValue(env, "brevoKey")),
			url: getValue(env, "brevoUrl"),
			listId: Number(getValue(env, "brevoListId")),
		},
	};
	return config;
};
