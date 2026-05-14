<script lang="ts">
	import UserAvatar from '$lib/components/image/UserAvatar.svelte';
	import type { UserGroupFieldsFragment } from '$lib/graphql/generated';

	interface Props {
		members: UserGroupFieldsFragment['group']['members'];
		captainId: number;
	}
	const { members, captainId }: Props = $props();

	const MAX_VISIBLE = 8;
	const visible = $derived(members.slice(0, MAX_VISIBLE));
	const overflow = $derived(members.length - MAX_VISIBLE);
</script>

<div class="members-row">
	<span class="row-label">
		Members
		<span class="member-count">({members.length})</span>
	</span>

	<div class="avatar-stack">
		{#each visible as m (m.id)}
			{#if m.user}
				<div
					class="avatar-chip"
					data-tooltip={m.user.login}
					class:is-captain={m.user.id === captainId}
				>
					<UserAvatar avatarUrl={m.user.avatarUrl} userLogin={m.user.login} />
				</div>
			{/if}
		{/each}

		{#if overflow > 0}
			<div class="avatar-chip avatar-overflow">+{overflow}</div>
		{/if}
	</div>
</div>

<style>
	.members-row {
		display: flex;
		align-items: center;
		gap: 8px;
	}

	.row-label {
		font-size: 10px;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.07em;
		color: #4e6278;
		white-space: nowrap;
		flex-shrink: 0;
	}

	.member-count {
		font-size: 11px;
		color: #6b7f96;
		margin-left: 4px;
	}

	.avatar-stack {
		display: flex;
		flex-direction: row-reverse;
		margin-left: 4px;
		flex-wrap: wrap;
		justify-content: center;
	}

	.avatar-chip {
		width: 50px;
		height: 50px;
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-left: -8px;
		flex-shrink: 0;
		cursor: default;

		:global(img) {
			border: 2px solid hsl(213, 60%, 10%);
			border-radius: 50%;
			overflow: hidden;
			aspect-ratio: 1/1;
			object-fit: cover;
		}
	}

	.avatar-chip.is-captain {
		:global(img) {
			border-color: hsl(45, 80%, 50%);
		}
	}

	.avatar-overflow {
		font-size: 9px;
		font-weight: 700;
		color: #6b7f96;
		background: hsl(213, 40%, 15%);
	}
</style>
