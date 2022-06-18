export function validate(schema, callback) {
	return async (args) => {
		const { request } = args
		const data = await request.json()
		const { error, value } = await schema.validate(data)

		if (error) {
			return {
				status: 406,
				body: { error }
			}
		}

		return await callback({...args, value})
	}
}
