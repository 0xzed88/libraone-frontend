import { fetchJSON } from '$lib/api/fetch';

export type Method = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
export type APIConfig = {
	ORIGIN: string;
	HEADERS?: () => HeadersInit;
};

export function config<T extends APIConfig>(cfg: T) {
	return cfg;
}

export function endpoint<Res>(
	method: Method,
	path: `/${string}`
): (this: APIConfig) => Promise<Res>;

export function endpoint<Req, Res>(
	method: Method,
	path: `/${string}`
): (this: APIConfig, body?: Req) => Promise<Res>;

export function endpoint<Req, Res, H extends string[]>(
	method: Method,
	path: `/${string}`,
	requiredHeaders: true
): (this: APIConfig, headers: { [K in H[number]]: string }, body?: Req) => Promise<Res>;

export function endpoint<Res, H extends string[]>(
	method: Method,
	path: `/${string}`,
	requiredHeaders: true
): (this: APIConfig, headers: { [K in H[number]]: string }) => Promise<Res>;

export function endpoint<Req, Res>(method: Method, path: `/${string}`, requiredHeaders?: boolean) {
	if (!requiredHeaders)
		return function (this: APIConfig, body?: Req) {
			const url = this.ORIGIN + path;
			return fetchJSON<Req, Res>(method, url, this.HEADERS?.(), body);
		};

	return function (this: APIConfig, headers: HeadersInit, body?: Req) {
		const url = this.ORIGIN + path;
		const mergedHeaders = { ...headers, ...this.HEADERS?.() };
		return fetchJSON<Req, Res>(method, url, mergedHeaders, body);
	};
}
