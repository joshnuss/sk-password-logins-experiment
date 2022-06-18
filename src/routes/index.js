import { db } from '$lib/db'
import { getCookieInfo } from '$lib/cookie'

export async function get({ request }) {
	const userId = getCookieInfo(request.headers.get('cookie'))
	const user = userId ? await db.user.findUnique({ where: { id: userId } }) : null

	return {
		body: {
			user
		}
	}
}
