import jwt from 'jsonwebtoken'
import type { Context, Next } from 'hono'

export const protect = async (
  c: Context,
  next: Next,
) => {
  try {
    const authHeader =
      c.req.header('Authorization')

    if (!authHeader) {
      return c.json(
        {
          message: 'No token provided',
        },
        401,
      )
    }

    const token = authHeader.split(' ')[1]

   const decoded = jwt.verify(
  token,
  process.env.JWT_SECRET!,
) as {
  id: string
  role: string
}

c.set('user', decoded)

    await next()
  } catch (error) {
    console.error(error)

    return c.json(
      {
        message: 'Invalid token',
      },
      401,
    )
  }
}