import { writable } from 'svelte/store';

const INTRA_KEY_STORAGE = 'intra_jwt';
const jwt = localStorage.getItem(INTRA_KEY_STORAGE);
export const intraUserState = writable({ jwt, user: null });
intraUserState.subscribe((v) => {
	console.log(v);
	if (v.jwt) localStorage.setItem(INTRA_KEY_STORAGE, v.jwt);
});

export interface ProfileUser {
	username: string;
	role: string;
	token: string;
}
const PROFILE_KEY_STORAGE = 'profile_jwt';
const profileUser = localStorage.getItem(PROFILE_KEY_STORAGE);
export const profileUserState = writable<ProfileUser | null>(
	profileUser ? JSON.parse(profileUser) : null
);

profileUserState.subscribe((v) => {
	if (v) localStorage.setItem(PROFILE_KEY_STORAGE, JSON.stringify(v));
});
