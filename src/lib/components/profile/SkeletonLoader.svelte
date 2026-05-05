<div class="skeleton-wrap">
	<div class="skeleton-avatar"></div>
	<div class="skeleton-lines">
		<div class="skel skel-lg"></div>
		<div class="skel skel-md"></div>
		<div class="skel skel-sm"></div>
	</div>
</div>

<style>
	.skeleton-wrap {
		display: flex;
		gap: 20px;
		align-items: center;
		padding: 24px;
	}
	.skeleton-avatar {
		width: 80px;
		height: 80px;
		border-radius: 50%;
		background: hsla(215, 30%, 18%, 0.7);
		animation: pulse 1.4s ease infinite;
		flex-shrink: 0;
	}
	.skeleton-lines {
		display: flex;
		flex-direction: column;
		gap: 10px;
		flex: 1;
	}
	.skel {
		border-radius: 6px;
		background: hsla(215, 30%, 18%, 0.7);
		animation: pulse 1.4s ease infinite;
	}
	.skel-lg {
		height: 20px;
		width: 200px;
	}
	.skel-md {
		height: 14px;
		width: 130px;
		animation-delay: 0.1s;
	}
	.skel-sm {
		height: 12px;
		width: 90px;
		animation-delay: 0.2s;
	}
	@keyframes pulse {
		0%,
		100% {
			opacity: 0.4;
		}
		50% {
			opacity: 0.8;
		}
	}
</style>
