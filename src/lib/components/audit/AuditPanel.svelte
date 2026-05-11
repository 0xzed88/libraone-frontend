<script lang="ts">
	import SelectCheckbox from '$lib/assets/svg/select-checkbox.svelte';
	import type { GetAssignedAuditsQuery } from '$lib/graphql/generated';
	import AuditCard from './AuditCard.svelte';

	type Props = { audits: GetAssignedAuditsQuery['audit'] };

	let { audits }: Props = $props();

	const projectName = (path: string) => path.split('/').filter(Boolean).pop() ?? path;
</script>

<div class="panel" role="dialog" aria-label="Assigned audits">
	<div class="panel-header">
		<span class="panel-title">Assigned Audits</span>
		<span class="panel-count">{audits.length} pending</span>
	</div>

	{#if audits.length === 0}
		<div class="empty">
			<SelectCheckbox />
			<p>No pending audits</p>
		</div>
	{:else}
		<ul class="audit-list">
			{#each audits as audit (audit.private?.code ?? audit.updatedAt)}
				<AuditCard
					name={audit.group ? projectName(audit.group.path) : '—'}
					endAt={audit.endAt}
					code={audit.private?.code ?? null}
					captainLogin={audit.group?.captainLogin ?? null}
					members={audit.group?.members ?? []}
				/>
			{/each}
		</ul>
	{/if}
</div>

<style>
	.panel {
		position: absolute;
		top: calc(100% + 10px);
		right: 0;
		width: 310px;
		border-radius: 14px;
		border: 1px solid hsla(215, 40%, 70%, 0.1);
		background: hsla(215, 40%, 8%, 0.96);
		backdrop-filter: blur(20px);
		box-shadow:
			0 0 0 1px hsla(215, 40%, 70%, 0.04),
			0 20px 50px rgba(0, 0, 0, 0.55);
		z-index: 100;
		overflow: hidden;
		animation: panel-in 0.18s cubic-bezier(0.22, 1, 0.36, 1) both;
	}

	@keyframes panel-in {
		from {
			opacity: 0;
			transform: translateY(-6px) scale(0.97);
		}
		to {
			opacity: 1;
			transform: translateY(0) scale(1);
		}
	}

	.panel-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 14px 16px 10px;
		border-bottom: 1px solid hsla(215, 40%, 70%, 0.07);
	}

	.panel-title {
		font-size: 0.72rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.08em;
		color: hsl(215, 15%, 55%);
	}

	.panel-count {
		font-size: 0.68rem;
		font-weight: 600;
		color: hsl(210, 70%, 65%);
		background: hsla(210, 70%, 60%, 0.1);
		padding: 2px 8px;
		border-radius: 999px;
		border: 1px solid hsla(210, 70%, 60%, 0.15);
	}

	.empty {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 8px;
		padding: 32px 16px;
		color: hsl(215, 15%, 40%);

		p {
			font-size: 0.82rem;
			margin: 0;
		}
	}

	.audit-list {
		list-style: none;
		margin: 0;
		padding: 8px;
		display: flex;
		flex-direction: column;
		gap: 4px;
		max-height: 420px;
		overflow-y: auto;
	}
</style>
