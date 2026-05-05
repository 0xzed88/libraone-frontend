<script lang="ts">
	export const { icon, title, detail } = $props();
</script>

<div class="not-found">
	<span class="nf-icon">{icon}</span>
	<p>{title}</p>
	{#if detail}
		<small>{detail}</small>
	{/if}
</div>

<style>
	.not-found {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 8px;
		padding: 60px;
		color: var(--text-muted);
	}
	.nf-icon {
		font-size: 2.4rem;
		opacity: 0.4;
	}
	.not-found p {
		font-size: 0.95rem;
		margin: 0;
	}
	.not-found small {
		font-size: 0.75rem;
		opacity: 0.6;
	}
</style>
