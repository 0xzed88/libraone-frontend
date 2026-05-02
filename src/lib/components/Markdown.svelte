<script lang="ts">
	import SvelteMarkdown from '@humanspeak/svelte-markdown';
	import 'github-markdown-css/github-markdown.css';
	import DOMPurify from 'dompurify';
	const props: { url: string } = $props();

	const fetchMarkdown = async (url: string) => {
		const resp = await fetch(url);
		const text = await resp.text();
		return DOMPurify.sanitize(text);
	};

	const markdown = $derived(fetchMarkdown(props.url));
</script>

{#await markdown}
	Loading markdown...
{:then source}
	<SvelteMarkdown {source} />
{:catch}
	Failed to load markdown.
{/await}
