import { Client } from '$lib/graphql/client';
import { GetEventUsersDocument, Order_By, type Event_User_Order_By } from '$lib/graphql/generated';

type Options = {
	orderBy: Event_User_Order_By[] | Event_User_Order_By;
	limit: number;
	offset: number;
	search: string;
};

const defaultOptions: Options = {
	orderBy: { createdAt: Order_By.Desc },
	limit: 10,
	offset: 0,
	search: ''
};

export const getEventUsers = async (eventId: number, options = defaultOptions) => {
	const { limit, offset, orderBy, search } = options;

	const fullName = search.split(' ');

	const events_users = await Client.request(GetEventUsersDocument, {
		eventId,
		limit,
		offset,
		orderBy,
		search: `%${search}%`,
		firstNameSearch: `%${fullName[0]}%`,
		lastNameSearch: `%${fullName[1]}%`
	});

	return events_users.childEvents[0].usersRelation.filter(
		(u): u is typeof u & { publicUser: NonNullable<typeof u.publicUser> } => u.publicUser !== null
	);
};
