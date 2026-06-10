import { prisma } from '../lib/prisma'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import type { Context } from 'hono'

export const signup = async (c: Context) => {
  try {
    const { name, email, password, role } = await c.req.json()
    if (!name || !email || !password || !role) {
  return c.json(
    { message: 'All fields are required' },
    400,
  )
}

if (!email.includes('@')) {
  return c.json(
    { message: 'Invalid email address' },
    400,
  )
}

if (password.length < 6) {
  return c.json(
    { message: 'Password must be at least 6 characters' },
    400,
  )
}

if (!['BUYER', 'SELLER'].includes(role)) {
  return c.json(
    { message: 'Role must be BUYER or SELLER' },
    400,
  )
}

    const existingUser = await prisma.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      return c.json({ message: 'User already exists' }, 400)
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role,
      },
    })

   const { password: _, ...userWithoutPassword } = user

return c.json({
  message: 'Signup successful',
  user: userWithoutPassword,
})
  } catch (error) {
  console.error(error)

  return c.json(
    {
      message: 'Signup failed',
    },
    500,
  )
}
  }


export const login = async (c: Context) => {
  try {
    const { email, password } = await c.req.json()
    if (!email || !password) {
  return c.json(
    { message: 'Email and password are required' },
    400,
  )
}
    if (!email.includes('@')) {
  return c.json(
    { message: 'Invalid email address' },
    400,
  )
}

    const user = await prisma.user.findUnique({
      where: { email },
    })

    if (!user) {
      return c.json({ message: 'User not found' }, 404)
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
      return c.json({ message: 'Invalid credentials' }, 401)
    }

    const token = jwt.sign(
  {
    id: user.id,
    role: user.role,
  },
  process.env.JWT_SECRET!,
  {
    expiresIn: '7d',
  },
)

    return c.json({
      message: 'Login successful',
      token,
    })
  } catch (error) {
  console.error(error)

  return c.json(
    {
      message: 'Login failed',
    },
    500,
  )
}
}