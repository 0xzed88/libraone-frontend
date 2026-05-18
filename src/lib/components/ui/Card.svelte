<!-- lib/components/ui/Card.svelte -->
<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		tag?: 'header' | 'section' | 'div' | 'article';
		glow?: boolean;
		padding?: 'sm' | 'md' | 'lg';
		children?: Snippet;
	}

	const { tag = 'div', glow = false, padding = 'md', children }: Props = $props();
</script>

<svelte:element this={tag} class="card" data-padding={padding}>
	{#if glow}<div class="card-glow" aria-hidden="true"></div>{/if}
	{@render children?.()}
</svelte:element>

<style>
	.card {
		position: relative;
		border-radius: 14px;
		background: hsla(215, 35%, 10%, 0.5);
		border: 1px solid hsla(215, 40%, 70%, 0.08);
		backdrop-filter: blur(10px);
	}

	.card[data-padding='sm'] {
		padding: 16px;
	}
	.card[data-padding='md'] {
		padding: 24px;
	}
	.card[data-padding='lg'] {
		padding: 28px;
	}

	.card-glow {
		position: absolute;
		top: -40px;
		left: -40px;
		width: 220px;
		height: 220px;
		border-radius: 50%;
		background: radial-gradient(circle, hsla(210, 80%, 50%, 0.07) 0%, transparent 70%);
		pointer-events: none;
	}
</style>
