<script lang="ts">
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import intra from '$lib/assets/intra.png';
	import Gitea from '$lib/assets/svg/gitea.svelte';
	import PanelCard from '$lib/components/PanelCard.svelte';
	import Profile from '$lib/assets/svg/profile.svelte';
</script>

<div class="login-root">
	<div class="orb orb-1" aria-hidden="true"></div>
	<div class="orb orb-2" aria-hidden="true"></div>

	<div class="grid-overlay" aria-hidden="true"></div>
	<PanelCard wordmark="Link Accounts">
		<button class="btn btn-intra" onclick={() => goto(resolve('/login'))} disabled>
			<span class="btn-icon">
				<img src={intra} alt="intra" />
			</span>
			<span class="btn-label">
				<span class="btn-title">Intra</span>
				<span class="btn-sub">Authenticate via 01 Intra</span>
			</span>
			<span class="btn-arrow" aria-hidden="true">→</span>
		</button>

		<button class="btn btn-profile" onclick={() => goto(resolve('/login/profile'))}>
			<span class="btn-icon btn-icon-profile"> <Profile /></span>
			<span class="btn-label">
				<span class="btn-title"> Profile</span>
				<span class="btn-sub">Connect your profile</span>
			</span>
			<span class="btn-arrow" aria-hidden="true">→</span>
		</button>
		<div class="divider"></div>
		<button class="btn btn-gitea is-soon" disabled>
			<span class="btn-icon">
				<Gitea />
			</span>
			<span class="btn-label">
				<span class="btn-title">Gitea</span>
				<span class="btn-sub">Authenticate via OAuth </span>
			</span>
			<span class="btn-arrow" aria-hidden="true">→</span>
		</button>
	</PanelCard>
</div>

<style>
	.login-root {
		position: relative;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		overflow: hidden;
	}

	/* ── Ambient orbs ── */
	.orb {
		position: absolute;
		border-radius: 50%;
		filter: blur(80px);
		pointer-events: none;
	}
	.orb-1 {
		width: 520px;
		height: 520px;
		top: -140px;
		right: -160px;
		background: radial-gradient(circle, hsla(38, 70%, 40%, 0.14) 0%, transparent 70%);
		animation: drift 18s ease-in-out infinite alternate;
	}
	.orb-2 {
		width: 480px;
		height: 480px;
		bottom: -120px;
		left: -140px;
		background: radial-gradient(circle, hsla(210, 80%, 45%, 0.12) 0%, transparent 70%);
		animation: drift 22s ease-in-out infinite alternate-reverse;
	}
	@keyframes drift {
		from {
			transform: translate(0, 0) scale(1);
		}
		to {
			transform: translate(30px, 20px) scale(1.06);
		}
	}

	/* ── Subtle grid ── */
	.grid-overlay {
		position: absolute;
		inset: 0;
		pointer-events: none;
		background-image:
			linear-gradient(hsla(215, 40%, 70%, 0.025) 1px, transparent 1px),
			linear-gradient(90deg, hsla(215, 40%, 70%, 0.025) 1px, transparent 1px);
		background-size: 48px 48px;
		mask-image: radial-gradient(ellipse 70% 70% at 50% 50%, black 40%, transparent 100%);
	}

	.btn {
		display: flex;
		align-items: center;
		gap: 0.875rem;
		padding: 0.875rem 1rem;
		border-radius: 0.875rem;
		border: 1px solid transparent;
		cursor: pointer;
		text-align: left;
		transition:
			background 0.2s ease,
			border-color 0.2s ease,
			transform 0.15s ease,
			box-shadow 0.2s ease;

		&:active {
			transform: scale(0.985);
		}

		&:disabled {
			cursor: not-allowed;
			opacity: 0.45;
			filter: grayscale(0.25) saturate(0.7);
			transform: none;
			box-shadow: none;
			position: relative;
		}

		&:disabled:hover {
			transform: none;
			box-shadow: none;
		}
	}

	.btn-intra {
		background: hsla(38, 60%, 18%, 0.55);
		border-color: hsla(38, 60%, 40%, 0.2);

		&:hover {
			background: hsla(38, 60%, 22%, 0.65);
			border-color: hsla(38, 60%, 50%, 0.3);
			box-shadow: 0 0 0 3px hsla(38, 70%, 40%, 0.08);
		}
	}

	.btn-profile {
		background: hsla(210, 60%, 18%, 0.55);
		border-color: hsla(210, 60%, 40%, 0.2);

		&:hover {
			background: hsla(210, 60%, 22%, 0.65);
			border-color: hsla(210, 60%, 50%, 0.3);
			box-shadow: 0 0 0 3px hsla(210, 70%, 40%, 0.08);
		}
	}

	.btn-icon {
		flex-shrink: 0;
		width: 2.5rem;
		height: 2.5rem;
		border-radius: 0.625rem;
		background: hsla(38, 60%, 30%, 0.3);
		border: 1px solid hsla(38, 60%, 50%, 0.15);
		display: flex;
		align-items: center;
		justify-content: center;

		img {
			width: 1.4rem;
			height: 1.4rem;
			object-fit: contain;
		}
	}

	.btn-icon-profile {
		background: hsla(210, 60%, 30%, 0.3);
		border-color: hsla(210, 60%, 50%, 0.15);
		color: hsl(210, 70%, 72%);
	}

	.btn-label {
		flex: 1;
		display: flex;
		flex-direction: column;
		gap: 0.125rem;
		min-width: 0;
	}

	.btn-title {
		font-size: 0.875rem;
		font-weight: 600;
		letter-spacing: -0.01em;
	}
	.btn-intra .btn-title {
		color: hsl(38, 70%, 72%);
	}
	.btn-profile .btn-title {
		color: hsl(210, 70%, 78%);
	}

	.btn-sub {
		font-size: 0.72rem;
		letter-spacing: 0.01em;
	}
	.btn-intra .btn-sub {
		color: hsl(38, 30%, 50%);
	}
	.btn-profile .btn-sub {
		color: hsl(210, 25%, 52%);
	}

	.btn-arrow {
		flex-shrink: 0;
		font-size: 1rem;
		opacity: 0;
		transform: translateX(-4px);
		transition:
			opacity 0.2s ease,
			transform 0.2s ease;
	}
	.btn-intra .btn-arrow {
		color: hsl(38, 70%, 65%);
	}
	.btn-profile .btn-arrow {
		color: hsl(210, 70%, 70%);
	}

	.btn:hover .btn-arrow {
		opacity: 1;
		transform: translateX(0);
	}
</style>
