import bcrypt from 'bcrypt'
import { db } from '$lib/db'
import { createCookie } from '$lib/cookie'
import { validate } from '$lib/interceptors'
import expect from 'joi'

const schema = expect.object({
	email: expect.string().email(),
	password: expect.string(),
})

export const post = validate(schema, async ({ request, value }) => {
	const { email, password } = value
	const user = await db.user.findUnique({ where: { email } })

	if (user && (await bcrypt.compare(password, user.password))) {
		return {
			headers: {
				'set-cookie': createCookie(user),
			}
		}
	}

	return {
		status: 406,
		body: {
			error: 'Invalid password or user not found'
		}
	}
})
