import bcrypt from 'bcrypt'
import { nanoid } from 'nanoid'
import { db } from '$lib/db'
import { createCookie } from '$lib/cookie'
import { validate } from '$lib/interceptors'
import { sendMail } from '$lib/mail'
import expect from 'joi'

const schema = expect.object({
	email: expect.string().email(),
	name: expect.string(),
	password: expect.string(),
	passwordConfirmation: expect.ref('password'),
})

export const post = validate(schema, async ({ request, value }) => {
	const { email, name, password } = value
	const salt = await bcrypt.genSalt(10)

	const user = await db.user.create({
		data: {
			email,
			name,
			password: await bcrypt.hash(password, salt),
			confirmationCode: nanoid()
		}
	})

	await sendMail({
		email,
		subject: 'Confirm your account',
		body: `http://localhost:3000/confirm?code=${user.confirmationCode}`
	})

	return {
		headers: {
			'set-cookie': createCookie(user),
		}
	}
})
