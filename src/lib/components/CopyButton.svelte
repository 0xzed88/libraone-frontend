<script lang="ts">
	type Props = {
		text: string;
		label?: string;
		successLabel?: string;
		timeout?: number;
		class?: string;
		'aria-label'?: string;
	};

	let {
		text,
		label = 'Copy',
		successLabel = 'Copied',
		timeout = 2000,
		class: className = '',
		'aria-label': ariaLabel
	}: Props = $props();

	let copied = $state(false);
	let timer: ReturnType<typeof setTimeout>;

	async function copy() {
		await navigator.clipboard.writeText(text);
		copied = true;
		clearTimeout(timer);
		timer = setTimeout(() => (copied = false), timeout);
	}
</script>

<button
	class="copy-btn {className}"
	class:copied
	onclick={copy}
	aria-label={ariaLabel ?? `Copy ${label.toLowerCase()}`}
>
	{#if copied}
		<svg
			width="11"
			height="11"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2.5"
		>
			<polyline points="20 6 9 17 4 12" />
		</svg>
		{successLabel}
	{:else}
		<svg
			width="11"
			height="11"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2.5"
		>
			<rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
			<path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
		</svg>
		{label}
	{/if}
</button>

<style>
	.copy-btn {
		display: inline-flex;
		align-items: center;
		gap: 5px;
		padding: 4px 10px;
		border-radius: 6px;
		font-size: 0.7rem;
		font-weight: 600;
		cursor: pointer;
		border: 1px solid hsla(215, 40%, 70%, 0.12);
		background: hsla(215, 40%, 70%, 0.05);
		color: hsl(215, 15%, 52%);
		transition:
			background 0.15s,
			border-color 0.15s,
			color 0.15s,
			transform 0.1s;

		&:hover {
			background: hsla(215, 40%, 70%, 0.1);
			border-color: hsla(215, 40%, 70%, 0.22);
			color: hsl(215, 15%, 70%);
		}

		&:active {
			transform: scale(0.96);
		}

		&.copied {
			border-color: hsla(142, 60%, 40%, 0.3);
			background: hsla(142, 60%, 40%, 0.1);
			color: hsl(142, 65%, 58%);
		}
	}
</style>
