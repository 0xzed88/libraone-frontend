export const formatDate = (d: string): string =>
	new Date(d).toLocaleString('en-GB', {
		day: '2-digit',
		month: 'short',
		year: 'numeric',
		hour: 'numeric',
		minute: 'numeric'
	});

const plural = (n: number, unit: string) => `${n} ${unit}${n === 1 ? '' : 's'}`;
export function timeUntil(dateStr: string): string {
	const now = new Date();
	const end = new Date(dateStr);

	let years = end.getFullYear() - now.getFullYear();
	let months = end.getMonth() - now.getMonth();
	let days = end.getDate() - now.getDate();

	if (days < 0) {
		months--;
		const prevMonth = new Date(end.getFullYear(), end.getMonth(), 0);
		days += prevMonth.getDate();
	}
	if (months < 0) {
		years--;
		months += 12;
	}

	if (end <= now) return 'Ended';

	const parts = [];

	if (years > 0) parts.push(plural(years, 'year'));
	if (months > 0) parts.push(plural(months, 'month'));
	if (days > 0) parts.push(plural(days, 'day'));

	return parts.length ? parts.join(' ') : 'Today';
}

export function fmtSeconds(s: number): string {
	if (!s) return '0h';
	const h = Math.floor(s / 3600);
	const m = Math.floor((s % 3600) / 60);
	return h > 0 ? `${h}h ${m > 0 ? m + 'm' : ''}`.trim() : `${m}m`;
}

export function monthLabel(key: string): string {
	const [y, mo] = key.split('-');
	return new Date(+y, +mo - 1, 1).toLocaleString('default', { month: 'short' });
}

export function sessionDuration(start: string, end: string): string {
	const diff = (new Date(end).getTime() - new Date(start).getTime()) / 1000;
	return fmtSeconds(diff);
}

export function formatDateInput(d: Date): string {
	return d.toISOString().slice(0, 10);
}
