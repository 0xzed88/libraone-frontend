<script lang="ts">
	import { infiniteScroll } from '$lib/actions/infiniteScroll';
	import { Client } from '$lib/graphql/client';
	import {
		GetUserGroupsByIdDocument,
		GetUserGroupsByLoginDocument,
		type UserGroupFieldsFragment
	} from '$lib/graphql/generated';
	import { intraUserState } from '$lib/stores/user.svelte';
	import GroupCard from '$lib/components/group/GroupCard.svelte';

	const { userId }: { userId: string } = $props();

	const LIMIT = 10;

	const fetchPage = async (offset: number) => {
		const vars = { offset, limit: LIMIT };
		const params = Number.isInteger(+userId)
			? [GetUserGroupsByIdDocument, { userId: +userId, ...vars }]
			: [GetUserGroupsByLoginDocument, { userLogin: userId, ...vars }];

		const userGroups = await Client.request(...params);
		return userGroups.group_user;
	};

	let pages = $state<Promise<UserGroupFieldsFragment[]>[]>([]);
	let offset = 0;
	$effect(() => {
		offset = 0;
		pages = [fetchPage(0)];
	});

	function loadMore() {
		offset += LIMIT;
		pages.push(fetchPage(offset));
	}
</script>

<div class="groups-root">
	{#each pages as page (page)}
		{#await page}
			{#each { length: 3 } as _, i (i)}
				<div class="group-card skeleton" style="animation-delay: {i * 80}ms"></div>
			{/each}
		{:then groups}
			{#if groups.length > 0}
				<div class="sentinel" use:infiniteScroll={loadMore}></div>
			{/if}

			{#each groups as userGroup (userGroup.id)}
				<GroupCard {userGroup} intraUserId={$intraUserState?.userId} />
			{/each}
		{:catch err}
			<p class="error-msg">Failed to load groups: {err.message}</p>
		{/await}
	{/each}
</div>

<style>
	.groups-root {
		display: flex;
		flex-direction: column;
		gap: 12px;
	}

	.sentinel {
		width: 0;
		height: 0;
	}

	.group-card.skeleton {
		height: 120px;
		border-radius: var(--border-radius-lg, 12px);
		border: 1px solid hsl(213, 40%, 14%);
		background: hsla(213, 40%, 10%, 0.7);
		animation: pulse 1.4s ease infinite;
	}

	@keyframes pulse {
		0%,
		100% {
			opacity: 0.4;
		}
		50% {
			opacity: 0.75;
		}
	}

	.error-msg {
		font-size: 12px;
		color: #f87171;
		padding: 8px 0;
	}
</style>
