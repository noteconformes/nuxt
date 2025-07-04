import { getConfig } from "@/config/constants";

interface AddContactProps {
	email: string;
	name: string;
}

const onSend = async (
	props: AddContactProps,
	brevo: { key: string; url: string; listId: number },
) => {
	const names = props.name.split(" ");
	const body = {
		email: props.email,
		attributes: {
			FIRSTNAME: names.length > 0 ? names[0] : undefined,
			LASTNAME: names.length > 1 ? names[1] : undefined,
		},
		emailBlacklisted: false,
		smsBlacklisted: false,
		listIds: [brevo.listId],
		updateEnabled: true,
	};
	const response = await fetch(`${brevo.url}/contacts`, {
		method: "post",
		headers: new Headers({
			"api-key": brevo.key,
			"Content-Type": "application/json",
			Accept: "application/json",
		}),
		body: JSON.stringify(body),
	});
	// https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/201
	if (response.status !== 201) {
		throw new Error(
			"Lo sentimos, no se pudo suscribirte al newsletter. Por favor, intenta nuevamente.",
		);
	}
	return response;
};

export const useSuscription = () => {
	const loading = ref(false);
	const success = ref(false);
	const error = ref<Error>();
	const env = getConfig(useRuntimeConfig());
	const onSave = async (props: AddContactProps) => {
		loading.value = true;
		error.value = undefined;
		try {
			const response = await onSend(props, env.brevo);
			success.value = true;
			return response;
		} catch (e) {
			error.value = e as Error;
		} finally {
			loading.value = false;
		}
		return undefined;
	};

	return {
		onSave,
		loading,
		success,
		error,
	};
};
