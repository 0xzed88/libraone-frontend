export function infiniteScroll<T>(sentinel: HTMLElement, callback: () => T | Promise<T>) {
	const parent = sentinel.parentElement;
	const observer = new IntersectionObserver(
		(entries) => {
			entries.forEach(async (entry) => {
				if (entry.isIntersecting) {
					try {
						await callback();
					} finally {
						observer.unobserve(entry.target);
						entry.target.remove();
					}
				}
			});
		},
		{ root: parent, threshold: 0 }
	);

	observer.observe(sentinel);

	return {
		destroy() {
			observer.disconnect();
		}
	};
}
