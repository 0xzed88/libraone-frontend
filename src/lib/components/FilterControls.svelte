<script lang="ts">
	interface Props {
		search: string;
		sortOptions: { key: string; label: string }[];
		sortKey: string;
		sortDir: 'desc' | 'asc';
	}
	let {
		search = $bindable(),
		sortOptions,
		sortKey = $bindable(),
		sortDir = $bindable()
	}: Props = $props();

	function toggleSort(key: string) {
		if (sortKey === key) sortDir = sortDir === 'asc' ? 'desc' : 'asc';
		else sortDir = 'desc';

		sortKey = key;
	}
</script>

<input bind:value={search} type="search" placeholder="Search by login or name" class="search" />
<div class="sort-bar" role="group" aria-label="Sort users">
	<span class="sort-label">Sort</span>
	{#each sortOptions as opt (opt.key)}
		<button
			class="sort-btn"
			class:active={sortKey === opt.key}
			onclick={() => toggleSort(opt.key)}
			aria-pressed={sortKey === opt.key}
		>
			{opt.label}
			<span class="sort-arrow" class:visible={sortKey === opt.key}>
				{#if sortDir === 'asc'}
					↑
				{:else}
					↓
				{/if}
			</span>
		</button>
	{/each}
</div>

<style>
	.search {
		width: 100%;
		border-radius: 12px;
		padding: 5px 12px;
	}

	.search::placeholder {
		color: rgba(255, 255, 255, 0.45);
	}

	.search:focus {
		border-color: rgba(255, 255, 255, 0.28);
		background: rgba(255, 255, 255, 0.09);
		box-shadow:
			0 0 0 4px rgba(255, 255, 255, 0.06),
			0 10px 28px rgba(0, 0, 0, 0.24);
		transform: translateY(-1px);
	}

	.sort-bar {
		display: flex;
		align-items: center;
		gap: 4px;
		padding: 4px;
		border-radius: 10px;
		background: hsla(215, 40%, 70%, 0.04);
		border: 1px solid hsla(215, 40%, 70%, 0.08);
		backdrop-filter: blur(10px);
	}

	.sort-label {
		font-size: 0.68rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.07em;
		color: hsl(215, 15%, 40%);
		padding: 0 6px 0 4px;
		user-select: none;
	}

	.sort-btn {
		display: inline-flex;
		align-items: center;
		gap: 4px;
		padding: 0.25rem 0.6rem;
		border-radius: 7px;
		border: 1px solid transparent;
		background: transparent;
		font-size: 0.72rem;
		font-weight: 600;
		letter-spacing: 0.03em;
		text-transform: uppercase;
		color: hsl(215, 15%, 50%);
		cursor: pointer;
		transition:
			color 0.18s ease,
			background 0.18s ease,
			border-color 0.18s ease,
			box-shadow 0.18s ease;

		&:hover {
			color: hsl(210, 20%, 78%);
			background: hsla(215, 40%, 70%, 0.07);
		}

		&.active {
			color: hsl(210, 70%, 75%);
			background: hsla(210, 70%, 60%, 0.12);
			border-color: hsla(210, 70%, 60%, 0.2);
			box-shadow: inset 0 1px 0 hsla(210, 70%, 80%, 0.06);
		}
	}

	.sort-arrow {
		font-size: 0.8rem;
		line-height: 1;
		opacity: 0;
		transform: translateY(1px);
		transition:
			opacity 0.18s ease,
			transform 0.18s ease;

		&.visible {
			opacity: 0.9;
			transform: translateY(0);
		}
	}
</style>
