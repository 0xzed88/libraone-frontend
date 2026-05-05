<script lang="ts">
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import { profileUserState } from '$lib/stores/user.svelte';
	import Image from './Image.svelte';
	const loginUrl = resolve('/login');
</script>

{#if $profileUserState}
	{@const username = $profileUserState.username}
	<a href={loginUrl}>
		<Image
			src={`https://mapl.zone01oujda.ma/image/map/${username}`}
			alt={username}
			headers={{ 'X-TOKEN': $profileUserState.token }}
		/>
	</a>
{:else}
	<button class="btn blue" onclick={() => goto(loginUrl)}> Login </button>
{/if}

<style>
	a {
		overflow: hidden;
		width: 50px;
		height: 50px;
		border-radius: 50%;
	}
</style>
