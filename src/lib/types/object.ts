export interface GraphQLObject {
	name?: string;
	path?: string;
	type: string;
	children?: Record<string, GraphQLObject>;
	attrs: {
		subject?: string;
		validations?: Validation[];
		baseXp?: number;
		groupMin?: number;
		groupMax?: number;
	};
}

export type Validation = {
	form?: string;
	type: string;
	testImage: string;
};
