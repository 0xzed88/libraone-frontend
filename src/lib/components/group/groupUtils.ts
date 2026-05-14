import type { UserGroupFieldsFragment } from '$lib/graphql/generated';

export const projectName = (path: string) => path.split('/').filter(Boolean).pop() ?? path;

export const projectParent = (path: string) => {
	const parts = path.split('/').filter(Boolean);
	return parts.length > 1 ? parts.slice(0, -1).join('/') : null;
};

export const copyAuditors = (group: UserGroupFieldsFragment['group']) => {
	const members = group.members.map((m) => '@' + m.user?.login);
	const auditors = group.auditors.filter((a) => !a.closedAt).map((a) => '- @' + a.auditor?.login);
	const startDate = new Date().toLocaleTimeString('en-GB', {
		hour: '2-digit',
		minute: '2-digit'
	});

	const text = `Project: ${group.path.split('/').slice(-1)}
Team Members: ${members.join(' ')}
Available between: ${startDate} - 19:00
Auditors:
${auditors.join('\n')}`;

	navigator.clipboard.writeText(text);
};
