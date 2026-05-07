<div class="oneline-dot" data-tooltip="Online"></div>

<style>
	.oneline-dot {
		animation: pulse-online 2s infinite;
		position: absolute;
		bottom: 4px;
		right: 4px;
		width: 12px;
		height: 12px;
		border-radius: 50%;
		background: hsl(142, 70%, 45%);
		border: 2px solid hsl(222, 47%, 6%);
		box-shadow: 0 0 6px hsla(142, 70%, 45%, 0.6);
	}

	@keyframes pulse-online {
		0% {
			box-shadow:
				0 0 0 0 hsla(140, 80%, 55%, 0.55),
				0 0 12px hsla(140, 80%, 55%, 0.65);
		}
		70% {
			box-shadow:
				0 0 0 8px hsla(140, 80%, 55%, 0),
				0 0 18px hsla(140, 80%, 55%, 0.35);
		}
		100% {
			box-shadow:
				0 0 0 0 hsla(140, 80%, 55%, 0),
				0 0 12px hsla(140, 80%, 55%, 0.65);
		}
	}
</style>
