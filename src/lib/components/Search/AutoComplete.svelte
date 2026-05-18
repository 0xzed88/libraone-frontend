<script lang="ts">
	import { resolve } from '$app/paths';
	import { searchProject } from '$lib/stores/objects.svelte';

	let { query = $bindable<string>() } = $props();
	let searchResultPromise = $derived(searchProject(query));
</script>

<form>
	{#await searchResultPromise then searchResult}
		{#each searchResult as res (res)}
			<a
				href={resolve(`/content/${res.path}`)}
				class="result"
				title={res.path}
				onclick={() => (query = res.path)}
			>
				{res.name}
				<!-- {#each res.highlight as part, index (index)}
					<span class="part">{part}</span>
					<span class="highlight">{query}</span>
				{/each} -->
			</a>
		{/each}
	{/await}
</form>

<style>
	form {
		display: flex;
		flex-direction: column;
	}

	.result {
		padding: 10px;
		display: flex;
		width: 100%;
		text-align: left;
		cursor: pointer;

		&:focus,
		&:hover {
			background: var(--bg-3);
		}
	}
</style>
