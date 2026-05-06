<script lang="ts">
	import EventList from '$lib/components/EventList.svelte';
	import { Client } from '$lib/graphql/client';
	import { GetEventChildrenDocument } from '$lib/graphql/generated';
	import type { PageProps } from './$types';
	const { params }: PageProps = $props();

	const getChildEvents = async () => {
		const { childEvents } = await Client.request(GetEventChildrenDocument, {
			eventId: +params.id,
			limit: Infinity,
			offset: 0
		});
		return childEvents;
	};
</script>

<div class="rootEvents">
	{#await getChildEvents()}
		loading...
	{:then events}
		<EventList {events} />
	{/await}
</div>

<style>
	.rootEvents {
		overflow: auto;
		padding: 20px;
	}
</style>
