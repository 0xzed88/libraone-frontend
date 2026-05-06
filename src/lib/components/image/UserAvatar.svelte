<script lang="ts">
	import { get } from 'svelte/store';
	import FallbackImage from './FallbackImage.svelte';
	import Image from './Image.svelte';
	import { profileUserState } from '$lib/stores/user.svelte';
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';

	interface Props {
		userLogin?: string | null;
		avatarUrl?: string | null;
	}
	const { avatarUrl, userLogin }: Props = $props();
</script>

<button onclick={() => goto(resolve(`/users/${userLogin}`))}>
	<FallbackImage src={avatarUrl}>
		<Image
			src={`https://mapl.zone01oujda.ma/image/map/${userLogin}`}
			alt={userLogin}
			headers={{ 'X-TOKEN': `${get(profileUserState)?.token}` }}
		/>
	</FallbackImage>
</button>
