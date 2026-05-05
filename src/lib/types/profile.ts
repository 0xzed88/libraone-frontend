import type { PublicUserFieldsFragment } from '$lib/graphql/generated';

export type LastSession = {
	start: string;
	end: string;
	hostname?: string | null;
	ip_address?: string | null;
};

export type MaplProfile = {
	main_group?: string | null;
	sub_group?: string | null;
	location?: string | null;
	last_session?: LastSession | null;
};

export type LogtimeMonth = {
	total: number;
	logtime: Record<string, number>;
};

export type LogtimeData = Record<string, LogtimeMonth>;

export type PageDataBundle = {
	user: PublicUserFieldsFragment | null;
	profile: MaplProfile | null;
	logtime: LogtimeData | null;
};
