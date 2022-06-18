const domain = new URL('http://localhost')
const name = 'id'

export function getCookieInfo(cookieString) {
  const cookies = Object.fromEntries(cookieString.split(';').map(record => record.trim().split('=')))
  const userId = cookies[name]

  return parseInt(userId)
}

export function createCookie(user) {
  // TODO use Secure in prod and encrypt
  return `${name}=${user.id}; Domain=${domain.hostname}; Path=/; SameSite=Lax; Secure; HttpOnly; Expires=Wed, 21 Oct 2023 07:28:00 GMT`
}

export function createExpiredCookie() {
  // TODO use Secure in prod and encrypt
  return `${name}=; Domain=${domain.hostname}; Path=/; SameSite=Lax; Secure; HttpOnly; Expires=Sat 1 Jan 2000 00:00:00 GMT`
}
