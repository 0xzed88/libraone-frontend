function getScrollParent(el: HTMLElement | null): HTMLElement | null {
	while (el) {
		const style = getComputedStyle(el);
		const overflowY = style.overflowY;
		const canScroll = overflowY === 'auto' || overflowY === 'scroll' || overflowY === 'overlay';

		if (canScroll && el.scrollHeight > el.clientHeight) {
			return el;
		}

		el = el.parentElement;
	}

	return null;
}

export function infiniteScroll<T>(sentinel: HTMLElement, callback: () => T | Promise<T>) {
	const root = getScrollParent(sentinel);

	const observer = new IntersectionObserver(
		async (entries) => {
			for (const entry of entries) {
				if (entry.isIntersecting) {
					try {
						await callback();
					} finally {
						observer.unobserve(entry.target);
						entry.target.remove();
					}
				}
			}
		},
		{
			root,
			threshold: 0
		}
	);

	observer.observe(sentinel);

	return {
		destroy() {
			observer.disconnect();
		}
	};
}
