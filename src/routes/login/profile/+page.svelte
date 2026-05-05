<script lang="ts">
	import Link from '$lib/assets/svg/link.svelte';
	import PanelCard from '$lib/components/PanelCard.svelte';
	import { profileUserState } from '$lib/stores/user.svelte';

	let username = $state('');
	let password = $state('');
	let error = $state('');
	let loading = $state(false);

	const handleSubmit = async (e: SubmitEvent) => {
		e.preventDefault();
		error = '';
		loading = true;

		try {
			const loginResp = await fetch('https://mapl.zone01oujda.ma/login', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ username, password })
			});

			const creds = await loginResp.json();

			if (!loginResp.ok) {
				error = creds.detail || 'Invalid username or password';
				return;
			}

			$profileUserState = creds;
			history.back();
		} catch {
			error = 'Unable to connect. Please try again.';
		} finally {
			loading = false;
		}
	};
</script>

<article>
	<form onsubmit={handleSubmit}>
		<PanelCard wordmark="Profile">
			<input bind:value={username} type="text" placeholder="username" required />
			<input bind:value={password} type="password" placeholder="password" required />

			{#if error}
				<p class="error">{error}</p>
			{/if}

			<button class="btn blue" type="submit" disabled={loading}>
				<Link />
				{loading ? 'Linking...' : 'Link'}
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

	.error {
		color: #ef4444;
		font-size: 0.875rem;
		margin: 0.5rem 0;
	}
	button:disabled {
		opacity: 0.5;
		cursor: not-allowed;
		pointer-events: none;
		filter: grayscale(20%);
		transform: none;
		box-shadow: none;
	}
</style>
