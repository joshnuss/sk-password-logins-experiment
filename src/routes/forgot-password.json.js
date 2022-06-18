import { nanoid } from 'nanoid'
import { db } from '$lib/db'
import { validate } from '$lib/interceptors'
import { sendMail } from '$lib/mail'
import { add } from 'date-fns'
import expect from 'joi'

const schema = expect.object({
	email: expect.string().email(),
})

export const post = validate(schema, async ({ request, value }) => {
	const { email } = value

	let user = await db.user.findUnique({ where: { email } })

	if (!user) {
		return {
			status: 404
		}
	}

	user = await db.user.update({
		where: { email },
		data: {
			resetCode: nanoid(),
			resetExpiresAt: add(new Date(), { minutes: 30 })
		}
	})

	await sendMail({
		email,
		subject: 'Reset your password',
		body: `http://localhost:3000/reset-password?code=${user.resetCode}`
	})

	return {}
})
