<script lang="ts">
	import EventList from '$lib/components/EventList.svelte';
	import { Client } from '$lib/graphql/client';
	import { GetRootEventsDocument } from '$lib/graphql/generated';

	const getRootEvents = async () => {
		const { rootEvents } = await Client.request(GetRootEventsDocument);
		return rootEvents;
	};
</script>

<div class="rootEvents">
	{#await getRootEvents()}
		<div>loading ....</div>
	{:then rootEvents}
		<EventList events={rootEvents} />
	{/await}
</div>

<style>
	.rootEvents {
		overflow: auto;
		padding: 20px;
	}
</style>
