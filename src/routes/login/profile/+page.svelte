<script lang="ts">
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import Link from '$lib/assets/svg/link.svelte';
	import PanelCard from '$lib/components/PanelCard.svelte';
	import { ProfileCreds } from '$lib/state/linked-profile';
	let username = $state();
	let password = $state();

	const handleSubmit = async () => {
		const loginResp = await fetch('https://mapl.zone01oujda.ma/login', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ username, password })
		});
		const creds = await loginResp.json();
		if (!loginResp.ok) return;

		ProfileCreds.value = creds;

		goto(resolve('/'));
	};
</script>

<article>
	<form onsubmit={handleSubmit}>
		<PanelCard wordmark="Profile">
			<input bind:value={username} type="text" placeholder="username" required />
			<input bind:value={password} type="password" placeholder="password" required />
			<button class="btn blue" type="submit">
				<Link />
				Link
			</button>
		</PanelCard>
	</form>
</article>

<style>
	article {
		position: relative;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		overflow: hidden;
	}
</style>
