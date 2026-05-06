<script lang="ts">
	import type { DOMAttributes } from 'svelte/elements';

	interface Props {
		src: string;
		alt?: string | null;
		headers: Record<string, string>;
		onerror?: DOMAttributes<HTMLImageElement>['onerror'];
	}

	const { src, alt, headers, onerror }: Props = $props();

	const getImageUrl = async () => {
		console.log(headers);

		const resp = await fetch(src, { headers });
		const url = URL.createObjectURL(await resp.blob());
		return url;
	};
</script>

{#await getImageUrl()}
	<!--  -->
{:then url}
	<img src={url} {alt} {onerror} />
{/await}

<style>
	img {
		width: 100%;
		height: auto;
		object-fit: cover;
	}
</style>
