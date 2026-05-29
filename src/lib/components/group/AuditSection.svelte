<script lang="ts">
	import UserAvatar from '$lib/components/image/UserAvatar.svelte';
	import type { UserGroupFieldsFragment } from '$lib/graphql/generated';
	import { formatDate } from '$lib/utils/time';
	import { copyAuditors } from './groupUtils';

	interface Props {
		group: UserGroupFieldsFragment['group'];
	}
	const { group }: Props = $props();
</script>

{#if group.auditors.length === 0}
	<div class="no-audit">
		<span>No audits yet</span>
	</div>
{:else}
	<div class="audit-section">
		<div class="audit-header">
			<span class="row-label">Auditors</span>
			<button class="copy" onclick={() => copyAuditors(group)}>copy</button>
		</div>

		{#each group.auditors as auditor (auditor.id)}
			{#if auditor.auditor}
				<div class="auditor-row">
					<div class="avatar" data-tooltip={auditor.auditor.login}>
						<UserAvatar
							avatarUrl={auditor.auditor.avatarUrl}
							userLogin={auditor.auditor.login}
							banned={!auditor.auditor.canAccessPlatform}
						/>
					</div>
					<span class="audit-date">{auditor.closureType}</span>
					<span class="audit-date">{formatDate(auditor.closedAt)}</span>
				</div>
			{/if}
		{/each}
	</div>

	{#if group.auditors.length > 1}
		<div class="audit-meta">
			{group.auditors.length} audit{group.auditors.length !== 1 ? 's' : ''} total
		</div>
	{/if}
{/if}

<style>
	.no-audit {
		font-size: 11px;
		color: #4e6278;
		padding: 4px 0;
	}

	.audit-section {
		border-radius: 8px;
		padding: 10px 12px;
		background: hsl(213, 40%, 8%);
		border: 1px solid hsl(213, 40%, 16%);
		display: flex;
		flex-direction: column;
		gap: 7px;
	}

	.audit-header {
		display: flex;
		align-items: center;
		gap: 8px;
		flex-wrap: wrap;
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

	.auditor-row {
		display: flex;
		align-items: center;
		gap: 7px;
	}

	.avatar {
		width: 50px;
		height: 50px;

		border: 2px solid hsl(213, 60%, 10%);
		border-radius: 50%;
		overflow: hidden;
		aspect-ratio: 1/1;
	}

	.audit-date {
		font-size: 11px;
		color: #4e6278;
		margin-left: auto;
	}

	.audit-meta {
		font-size: 11px;
		color: #4e6278;
		text-align: right;
	}

	.copy {
		margin-left: auto;
		padding: 4px 10px;
		border: 1px solid hsl(213, 40%, 20%);
		border-radius: 6px;
		background: hsl(213, 45%, 14%);
		color: #9fb3c8;
		font-size: 11px;
		font-weight: 600;
		letter-spacing: 0.02em;
		cursor: pointer;
		transition:
			background 0.15s ease,
			border-color 0.15s ease,
			color 0.15s ease,
			transform 0.08s ease;
	}

	.copy:hover {
		background: hsl(213, 50%, 18%);
		border-color: hsl(213, 40%, 28%);
		color: #e8edf2;
	}

	.copy:active {
		transform: scale(0.96);
	}

	.copy:focus-visible {
		outline: 2px solid hsl(213, 80%, 55%);
		outline-offset: 2px;
	}
</style>
