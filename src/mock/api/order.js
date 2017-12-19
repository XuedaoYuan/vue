import fetch from '@/util/fetch'
export function getCatalog() {
	return fetch({
		url: '/mock/catalog.json',
		method: 'get'
	});
}