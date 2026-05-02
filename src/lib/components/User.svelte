<script lang="ts">
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import { ProfileCreds } from '$lib/state/linked-profile';
	import Image from './Image.svelte';
	const profile = ProfileCreds.value;
	const loginUrl = resolve('/login');
</script>

{#if profile}
	{@const username = profile.username}
	<a href={loginUrl}>
		<Image
			src={`https://mapl.zone01oujda.ma/image/map/${username}`}
			alt={username}
			headers={{ 'X-TOKEN': profile.token }}
		/>
	</a>
{:else}
	<button class="btn blue" onclick={() => goto(loginUrl)}> Login </button>
{/if}
