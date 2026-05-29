<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		children: Snippet;
		tooltip?: string;
	}

	const { children, tooltip }: Props = $props();
</script>

<span data-tooltip={tooltip}>
	{@render children()}
</span>

<style>
	span {
		width: 100%;
		display: inline-flex;
		align-items: center;
		padding: 0.2rem 0.55rem;
		border-radius: var(--icon-radius);
		font-size: 0.7rem;
		font-weight: 700;
		letter-spacing: 0.04em;
		text-transform: uppercase;
		border: 1px solid var(--icon-border);
		background: var(--icon-bg);
		color: var(--icon-color);
	}
</style>
