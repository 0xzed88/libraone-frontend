interface ProfileCreds {
	username: string;
	role: string;
	token: string;
}
const KEY_STORAGE = 'profile_creds';
export const ProfileCreds = {
	set value(x: ProfileCreds) {
		localStorage.setItem(KEY_STORAGE, JSON.stringify(x));
	},
	get value(): ProfileCreds | null {
		const creds = localStorage.getItem(KEY_STORAGE);
		return creds ? JSON.parse(creds) : null;
	}
};

const fetchOnlineUsers = async () => {
	if (!ProfileCreds.value) return {};
	const onlineResp = await fetch('https://mapl.zone01oujda.ma/online', {
		method: 'GET',
		headers: { 'X-TOKEN': ProfileCreds.value.token }
	});
	if (!onlineResp.ok) return {};
	const busyPosts: Record<string, string> = await onlineResp.json();
	const onlineUsers: Record<string, string> = {};
	for (const post in busyPosts) {
		onlineUsers[busyPosts[post]] = post;
	}
	return onlineUsers;
};

export const OnlineUsers = await fetchOnlineUsers();
