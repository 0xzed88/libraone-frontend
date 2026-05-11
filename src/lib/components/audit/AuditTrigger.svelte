<script lang="ts">
	import SelectCheckbox from '$lib/assets/svg/select-checkbox.svelte';

	type Props = {
		count: number;
		open: boolean;
		onclick: () => void;
	};

	let { count, open, onclick }: Props = $props();
</script>

<button
	class="trigger"
	class:has-audits={count > 0}
	{onclick}
	aria-label="Assigned audits ({count})"
	aria-expanded={open}
>
	<SelectCheckbox />
	{#if count > 0}
		<span class="badge">{count}</span>
	{/if}
</button>

<style>
	.trigger {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 38px;
		height: 38px;
		border-radius: 10px;
		border: 1px solid hsla(215, 40%, 70%, 0.1);
		background: hsla(215, 40%, 70%, 0.04);
		color: hsl(215, 15%, 55%);
		cursor: pointer;
		padding: 0;
		transition:
			background 0.15s,
			border-color 0.15s,
			color 0.15s;
	}

	.trigger:hover {
		background: hsla(215, 40%, 70%, 0.09);
		border-color: hsla(215, 40%, 70%, 0.18);
		color: hsl(210, 20%, 80%);
	}

	.trigger.has-audits {
		color: hsl(210, 70%, 70%);
		border-color: hsla(210, 70%, 60%, 0.2);
		background: hsla(210, 70%, 60%, 0.07);
	}

	.badge {
		position: absolute;
		top: -5px;
		right: -5px;
		min-width: 17px;
		height: 17px;
		padding: 0 4px;
		border-radius: 999px;
		background: hsl(210, 80%, 52%);
		color: #fff;
		font-size: 10px;
		font-weight: 700;
		display: flex;
		align-items: center;
		justify-content: center;
		line-height: 1;
		border: 2px solid hsl(222, 47%, 6%);
	}
</style>
