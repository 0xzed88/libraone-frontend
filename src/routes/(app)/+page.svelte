<script lang="ts">
	import { resolve } from '$app/paths';
	import Event from '$lib/assets/svg/event.svelte';
	import Gite from '$lib/assets/svg/gite.svelte';

	const response = await fetch(
		`https://api.github.com/repos/xySaad/libraone-frontend/contributors`
	);
	const contributors: { login: string; avatar_url: string; html_url: string }[] =
		await response.json();
</script>

<nav class="links">
	<a class="card" href={resolve('/events')}>
		<Event />
		<p>Events</p>
	</a>
	<a class="card" href={resolve('/map')}>
		<Gite />
		<p>Map</p>
	</a>
</nav>

<footer class="contributors-footer">
	<div class="divider"></div>
	<span class="label">Contributors</span>
	<ul class="avatars">
		{#each contributors as contributor (contributor.login)}
			<li class="avatar-item" data-tooltip={contributor.login}>
				<a href={contributor.html_url} target="_blank" rel="noopener noreferrer external">
					<img src={contributor.avatar_url} alt={contributor.login} class="avatar" loading="lazy" />
				</a>
			</li>
		{/each}
	</ul>
</footer>

<style>
	.links {
		display: flex;
		gap: 1.5rem;
		margin: auto;
	}

	.card {
		text-decoration: none;
		background: #1e293b;
		padding: 1.5rem 2rem;
		border-radius: 12px;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.5rem;
		color: inherit;
		transition: 0.2s ease;
		min-width: 120px;
		justify-content: center;
	}

	.card:hover {
		background: #334155;
		transform: translateY(-4px);
	}

	.card p {
		margin: 0;
		font-size: 0.95rem;
	}

	/* ── Contributors Footer ── */
	.contributors-footer {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.75rem;
		padding: 1rem 1.5rem 1.25rem;
	}

	.label {
		font-size: 0.65rem;
		font-weight: 600;
		letter-spacing: 0.18em;
		text-transform: uppercase;
		color: var(--text-muted);
	}

	.avatars {
		list-style: none;
		margin: 0;
		padding: 0;
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: 0;
	}

	.avatar-item {
		margin-left: -8px;
		transition:
			transform 0.2s ease,
			z-index 0s;
		position: relative;
		z-index: 0;
	}

	.avatar-item:first-child {
		margin-left: 0;
	}

	.avatar-item:hover {
		transform: translateY(-5px) scale(1.12);
		z-index: 10;
	}

	.avatar {
		display: block;
		width: 32px;
		height: 32px;
		border-radius: 50%;
		border: 2px solid var(--primary);
		background: var(--secondary);
		transition: border-color 0.2s ease;
	}

	.avatar-item:hover .avatar {
		border-color: hsla(215, 40%, 70%, 0.4);
	}
</style>
