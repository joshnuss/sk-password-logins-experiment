import { createExpiredCookie } from '$lib/cookie'

export async function get() {
	return {
		status: 303,
		headers: {
			"set-cookie": createExpiredCookie(),
			location: '/'
		}
	}
}
