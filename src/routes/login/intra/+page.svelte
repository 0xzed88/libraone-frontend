<script lang="ts">
	import Link from '$lib/assets/svg/link.svelte';
	import PanelCard from '$lib/components/PanelCard.svelte';
	import { intraUserState } from '$lib/stores/user.svelte';
	import { jwtDecode } from 'jwt-decode';

	interface JWTPayload {
		sub: string;
		iat: number;
		ip: string;
		exp: number;
		'https://hasura.io/jwt/claims': {
			'x-hasura-allowed-roles': string[];
			'x-hasura-campuses': '{}';
			'x-hasura-default-role': 'user';
			'x-hasura-user-id': number;
			'x-hasura-token-id': string;
		};
	}

	let username = $state('');
	let password = $state('');
	let error = $state('');
	let loading = $state(false);

	const handleSubmit = async (e: SubmitEvent) => {
		e.preventDefault();

		error = '';
		loading = true;

		try {
			const b64 = btoa(`${username}:${password}`);

			const resp = await fetch('https://learn.zone01oujda.ma/api/auth/signin', {
				method: 'POST',
				headers: { Authorization: `Basic ${b64}` }
			});

			if (!resp.ok) {
				const json = await resp.json();
				error = json.error || 'Authentication failed';
				return;
			}

			const token = await resp.json();
			const payload = jwtDecode<JWTPayload>(token);
			const userId = +payload.sub;

			intraUserState.set({ jwt: token, userId });
			history.back();
		} catch (err) {
			error = err instanceof Error ? err.message : 'Something went wrong';
		} finally {
			loading = false;
		}
	};
</script>

<article>
	<form onsubmit={handleSubmit}>
		<PanelCard wordmark="Intra">
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
		margin-top: 0.75rem;
		font-size: 0.875rem;
		color: #ef4444;
		text-align: center;
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
