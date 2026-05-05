<script lang="ts">
	import UserCard from '$lib/components/UserCard.svelte';
	import { Client } from '$lib/graphql/client';
	import { GetUserByIdDocument, GetUserByLoginDocument } from '$lib/graphql/generated';
	import type { PageProps } from './$types';

	const { params }: PageProps = $props();
	const getPublicUser = async () => {
		if (Number.isInteger(params.id)) {
			const user = await Client.request(GetUserByIdDocument, { userId: +params.id });
			return user.user_public_view[0];
		} else {
			const user = await Client.request(GetUserByLoginDocument, { userLogin: params.id });
			return user.user_public_view[0];
		}
	};
</script>

<div class="profile">
	{#await getPublicUser()}
		loading...
	{:then user}
		{#if user}
			<UserCard link={false} {user} eventUserRel={undefined} />
		{/if}
	{/await}
</div>

<style>
	.profile {
		padding: 20px;
	}
</style>
