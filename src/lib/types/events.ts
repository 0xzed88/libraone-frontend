import type { EventFieldsFragment, GetEventUsersQuery } from '$lib/graphql/generated';
type _event_userRel = GetEventUsersQuery['childEvents'][number]['usersRelation'][number];
export type Event = EventFieldsFragment;
export type EventUserRel = NonNullable<_event_userRel>;
export type EventPublicUser = NonNullable<EventUserRel['publicUser']>;
