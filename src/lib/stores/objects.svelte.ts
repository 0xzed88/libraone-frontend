import api from '$lib/api';
import type { GraphQLObject } from '$lib/types/object';

const GraphQLObjectState = $state(api.PROXIED_INTRA.object());

const searchInChildren = (node: GraphQLObject, query: string, result: GraphQLObject[]) => {
	if (node.type === 'project')
		if (node.path?.includes(query) || node.name?.includes(query)) result.push(node);

	if (node.children) {
		for (const child of Object.values(node.children)) {
			searchInChildren(child, query, result);
		}
	}
};

export const searchProject = async (query: string) => {
	const data = await GraphQLObjectState;

	const result: GraphQLObject[] = [];

	searchInChildren(data, query, result);

	return result;
};

const findPathRecursive = (node: GraphQLObject, path: string): GraphQLObject | undefined => {
	if (node.path === path) return node;

	if (node.children) {
		for (const child of Object.values(node.children)) {
			const found = findPathRecursive(child, path);
			if (found) return found;
		}
	}

	return undefined;
};

export const findByPath = async (path: string) => {
	const data = await GraphQLObjectState;

	return findPathRecursive(data, path);
};
