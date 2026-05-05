<script lang="ts">
	import Link from '$lib/assets/svg/link.svelte';
	import PanelCard from '$lib/components/PanelCard.svelte';
	import { intraUserState } from '$lib/stores/user.svelte';
	let username = $state();
	let password = $state();

	const handleSubmit = async () => {
		const b64 = btoa(`${username}:${password}`);
		const resp = await fetch('https://learn.zone01oujda.ma/api/auth/signin', {
			method: 'POST',
			headers: { Authorization: `Basic ${b64}` }
		});

		if (!resp.ok) {
			const json = await resp.json();
			throw new Error(json.error);
		}
		const token = await resp.json();
		intraUserState.set({ jwt: token, user: null });

		history.back();
	};
</script>

<article>
	<form onsubmit={handleSubmit}>
		<PanelCard wordmark="Intra">
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
