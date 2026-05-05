<script lang="ts">
	import { fmtSeconds } from '$lib/utils/time';

	interface Props {
		months: [string, { total: number; logtime: Record<string, number> }][];
	}

	const { months }: Props = $props();
</script>

<div class="heatmaps">
	{#each months.filter(([, v]) => v.total > 0) as [key, data] (key)}
		{@const days = Object.entries(data.logtime) as [string, number][]}
		{@const maxDay = Math.max(...days.map(([, v]) => v), 1)}

		<div class="heatmap-month">
			<div class="hm-title">
				{new Date(key + '-01').toLocaleString('default', {
					month: 'long',
					year: 'numeric'
				})}
			</div>

			<div class="hm-grid">
				{#each days as [day, secs] (day)}
					{@const intensity = secs / maxDay}
					<div
						class="hm-cell"
						style="--i: {intensity}"
						data-tooltip="{day}: {fmtSeconds(secs)}"
					></div>
				{/each}
			</div>

			<div class="hm-total">
				Total: <span class="accent">{fmtSeconds(data.total)}</span>
			</div>
		</div>
	{/each}
</div>

<style>
	.heatmaps {
		justify-content: center;
		display: flex;
		flex-wrap: wrap;
		gap: 20px;
	}
	.heatmap-month {
		min-width: 160px;
	}
	.hm-title {
		font-size: 0.68rem;
		font-weight: 600;
		color: var(--text-muted);
		margin-bottom: 8px;
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}
	.hm-grid {
		display: grid;
		grid-template-columns: repeat(7, 1fr);
		gap: 3px;
	}
	.hm-cell {
		aspect-ratio: 1;
		border-radius: 3px;
		background: hsla(213, 70%, 50%, calc(0.08 + var(--i, 0) * 0.82));
		cursor: default;
		transition: transform 0.15s;
	}
	.hm-cell:hover {
		transform: scale(1.3);
	}
	.hm-total {
		font-size: 0.68rem;
		color: var(--text-muted);
		margin-top: 7px;
	}
	.accent {
		color: hsl(210, 80%, 65%);
	}
</style>
