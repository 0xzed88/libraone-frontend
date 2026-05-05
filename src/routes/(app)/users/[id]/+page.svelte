<script lang="ts">
	import { Client } from '$lib/graphql/client';
	import { GetUserByIdDocument, GetUserByLoginDocument } from '$lib/graphql/generated';
	import { get } from 'svelte/store';
	import type { PageProps } from './$types';
	import { profileUserState } from '$lib/stores/user.svelte';
	import SkeletonLoader from '$lib/components/profile/SkeletonLoader.svelte';
	import NotFoundState from '$lib/components/profile/NotFoundState.svelte';
	import ProfileHero from '$lib/components/profile/ProfileHero.svelte';
	import SessionCard from '$lib/components/profile/SessionCard.svelte';
	import LogtimeSection from '$lib/components/profile/LogtimeSection.svelte';
	import type { PageDataBundle } from '$lib/types/profile';
	import { formatDateInput } from '$lib/utils/time';

	const { params }: PageProps = $props();

	const getPublicUser = async () => {
		if (Number.isInteger(+params.id)) {
			const res = await Client.request(GetUserByIdDocument, { userId: +params.id });
			return res.user_public_view[0] ?? null;
		}

		const res = await Client.request(GetUserByLoginDocument, { userLogin: params.id });
		return res.user_public_view[0] ?? null;
	};

	const getMaplProfile = async (login: string) => {
		try {
			const r = await fetch(`https://mapl.zone01oujda.ma/profile/${login}`, {
				headers: { 'X-TOKEN': `${get(profileUserState)?.token}` }
			});
			return r.ok ? r.json() : null;
		} catch {
			return null;
		}
	};

	const getMaplLogtime = async (login: string) => {
		try {
			const now = new Date();
			// eslint-disable-next-line svelte/prefer-svelte-reactivity
			const start = new Date(now);
			start.setMonth(start.getMonth() - 12);
			const end = new Date(now.getFullYear(), now.getMonth() + 1, 0);

			const r = await fetch(
				`https://mapl.zone01oujda.ma/logtime/${login}?start=${formatDateInput(start)}&end=${formatDateInput(end)}`,
				{ headers: { 'X-TOKEN': `${get(profileUserState)?.token}` } }
			);

			return r.ok ? r.json() : null;
		} catch {
			return null;
		}
	};

	const allData = async (): Promise<PageDataBundle> => {
		const user = await getPublicUser();
		if (!user?.login) return { user: null, profile: null, logtime: null };

		const [profile, logtime] = await Promise.all([
			getMaplProfile(user.login),
			getMaplLogtime(user.login)
		]);

		return { user, profile, logtime };
	};
</script>

<div class="profile-root">
	{#await allData()}
		<SkeletonLoader />
	{:then { user, profile, logtime }}
		{#if !user}
			<NotFoundState />
		{:else}
			<ProfileHero {user} {profile} {logtime} />

			{#if profile?.last_session}
				<div class="cards-grid">
					<SessionCard lastSession={profile.last_session} />
				</div>
			{/if}

			{#if logtime}
				<LogtimeSection {logtime} />
			{/if}
		{/if}
	{:catch err}
		<NotFoundState icon="⚠" title="Failed to load user data" detail={err.message} />
	{/await}
</div>

<style>
	.profile-root {
		overflow: auto;
		padding: 28px 32px;
		margin: 0 auto;
		display: flex;
		flex-direction: column;
		gap: 20px;
		animation: fade-up 0.4s ease both;
		width: 100%;
		max-width: 1200px;
	}
	.cards-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
		gap: 16px;
	}
</style>
