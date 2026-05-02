<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		wordmark: string;
		children?: Snippet;
	}
	const { wordmark, children }: Props = $props();
</script>

<section class="panelCard">
	<header class="panel-header">
		<div class="wordmark">
			<span class="wordmark-accent">{wordmark}</span>
		</div>
	</header>
	<div class="divider"></div>
	<div class="actions">
		{@render children?.()}
	</div>
</section>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&display=swap');

	.actions {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
		animation: fade-up 0.5s 0.18s cubic-bezier(0.22, 1, 0.36, 1) both;
	}
	.divider {
		height: 1px;
		background: linear-gradient(
			90deg,
			transparent,
			hsla(215, 40%, 70%, 0.12) 30%,
			hsla(215, 40%, 70%, 0.12) 70%,
			transparent
		);
		margin-bottom: 1.5rem;
	}

	.wordmark {
		font-family: 'Syne', sans-serif;
		font-weight: 800;
		font-size: 2rem;
		letter-spacing: -0.04em;
		line-height: 1;
		color: hsl(210, 20%, 90%);
		margin-bottom: 0.5rem;
	}
	.wordmark-accent {
		color: hsl(38, 80%, 62%);
	}

	.panel-header {
		margin-bottom: 1.5rem;
		animation: fade-up 0.5s 0.1s cubic-bezier(0.22, 1, 0.36, 1) both;
	}
	.panelCard {
		position: relative;
		z-index: 1;
		width: min(420px, calc(100vw - 2rem));
		padding: 2rem;
		border-radius: 1.25rem;
		border: 1px solid hsla(215, 40%, 70%, 0.1);
		background: hsla(215, 40%, 8%, 0.7);
		backdrop-filter: blur(20px);
		box-shadow:
			0 0 0 1px hsla(215, 40%, 70%, 0.04),
			0 24px 64px rgba(0, 0, 0, 0.5),
			inset 0 1px 0 hsla(215, 40%, 70%, 0.08);

		animation: panel-in 0.55s cubic-bezier(0.22, 1, 0.36, 1) both;
	}

	@keyframes panel-in {
		from {
			opacity: 0;
			transform: translateY(20px) scale(0.97);
		}
		to {
			opacity: 1;
			transform: translateY(0) scale(1);
		}
	}
</style>
