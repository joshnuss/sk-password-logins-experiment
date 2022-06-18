import bcrypt from 'bcrypt'
import { db } from '$lib/db'
import { validate } from '$lib/interceptors'
import { sendMail } from '$lib/mail'
import { createCookie } from '$lib/cookie'
import expect from 'joi'

const schema = expect.object({
	code: expect.string(),
	password: expect.string(),
	passwordConfirmation: expect.ref('password'),
})

export const post = validate(schema, async ({ request, value }) => {
	const { code, password } = value

	const user = await db.user.findUnique({ where: { resetCode: code } })

	if (!user || !user.resetCode || user.resetExpiresAt < new Date()) {
		return {
			status: 404
		}
	}

	const salt = await bcrypt.genSalt(10)

	await db.user.update({
		where: { id: user.id },
		data: {
			password: await bcrypt.hash(password, salt),
			resetCode: null,
			resetExpiresAt: null
		}
	})

	await sendMail({
		email: user.email,
		subject: 'Password reset',
		body: 'Your password has been reset'
	})

	return {
		headers: {
			'set-cookie': createCookie(user),
		}
	}
})
