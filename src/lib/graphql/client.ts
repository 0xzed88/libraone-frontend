import { goto } from '$app/navigation';
import { resolve } from '$app/paths';
import { intraUserState } from '$lib/stores/user.svelte';
import { GraphQLClient } from 'graphql-request';
import { get } from 'svelte/store';

export const Client = new GraphQLClient(
	'https://learn.zone01oujda.ma/api/graphql-engine/v1/graphql'
);

const originalRequest = Client.request.bind(Client);

const patchedRequest = async (...args: Parameters<typeof Client.request>) => {
	try {
		Client.setHeader('Authorization', `Bearer ${get(intraUserState).jwt}`);
		return await originalRequest(...args);
	} catch (error) {
		console.log('error');
		goto(resolve('/login/intra'));
		throw error;
	}
};

Client.request = patchedRequest as typeof Client.request;
