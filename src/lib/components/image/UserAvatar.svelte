<script lang="ts">
	import FallbackImage from './FallbackImage.svelte';
	import Image from './Image.svelte';
	import { profileUserState } from '$lib/stores/user.svelte';
	import { resolve } from '$app/paths';
	import Person from '$lib/assets/svg/person.svelte';
	import Block from '$lib/assets/svg/block.svelte';

	interface Props {
		userLogin?: string | null;
		avatarUrl?: string | null;
		banned?: boolean | null;
	}
	const { avatarUrl, userLogin, banned }: Props = $props();
	const profileToken = $derived($profileUserState?.token);

	let error = $state(false);
</script>

<a href={resolve(`/users/${userLogin}`)} class:banned>
	<div class="banned-status">
		<Block />
	</div>
	<div class="avatar">
		<FallbackImage src={avatarUrl}>
			{#if error || !profileToken}
				<Person />
			{:else}
				<Image
					src={`https://mapl.zone01oujda.ma/image/map/${userLogin}`}
					alt={userLogin}
					headers={{ 'X-TOKEN': `${profileToken}` }}
					onerror={() => (error = true)}
				>
					<Person />
				</Image>
			{/if}
		</FallbackImage>
	</div>
</a>

<style>
	a {
		display: block;
		position: relative;
		max-width: 85px;
		border-radius: 100%;
		aspect-ratio: 1;
		overflow: hidden;

		.banned-status {
			display: none;
		}

		&.banned {
			&:hover .banned-status {
				display: none;
			}

			.banned-status {
				z-index: 1;
				display: flex;
				position: absolute;
				inset: 0;
				align-items: center;
				justify-content: center;
				background: var(--card-bg);
				color: var(--error);
				backdrop-filter: blur(1px);
			}
		}
	}
</style>
