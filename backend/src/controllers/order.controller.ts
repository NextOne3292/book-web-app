import { prisma } from '../lib/prisma.js'
import type { Context } from 'hono'

export const createOrder = async (c: Context) => {
  try {
   const user = c.get('user') as {
  id: string
  role: string
}
if (user.role !== 'BUYER') {
  return c.json(
    {
      message: 'Only buyers can place orders',
    },
    403,
  )
}
const userId = user.id

  
 
    

    const cart = await prisma.cart.findUnique({
      where: { userId },
      include: {
        items: {
          include: {
            book: true,
          },
        },
      },
    })

    if (!cart || cart.items.length === 0) {
      return c.json(
        {
          message: 'Cart is empty',
        },
        400,
      )
    }

    const totalAmount = cart.items.reduce(
      (total, item) =>
        total + item.book.price * item.quantity,
      0,
    )

    const order = await prisma.order.create({
      data: {
        userId,
        totalAmount,
      },
    })

    for (const item of cart.items) {
      await prisma.orderItem.create({
        data: {
          orderId: order.id,
          bookId: item.bookId,
          quantity: item.quantity,
          price: item.book.price,
        },
      })
    }

    await prisma.cartItem.deleteMany({
      where: {
        cartId: cart.id,
      },
    })

    return c.json(
      {
        message: 'Order created successfully',
        order,
      },
      201,
    )
  } catch (error) {
    console.error(error)

    return c.json(
      {
        message: 'Failed to create order',
      },
      500,
    )
  }
}

export const getOrders = async (c: Context) => {
  try {
    const user = c.get('user') as {
  id: string
  role: string
}
if (user.role !== 'BUYER') {
  return c.json(
    {
      message: 'Only buyers can view orders',
    },
    403,
  )
}
const userId = user.id

    const orders = await prisma.order.findMany({
      where: { userId },
      include: {
        items: {
          include: {
            book: true,
          },
        },
      },
    })

    return c.json(orders)
  } catch (error) {
    console.error(error)

    return c.json(
      {
        message: 'Failed to fetch orders',
      },
      500,
    )
  }
}
export const getSellerOrders = async (
  c: Context,
) => {
  try {
    const user = c.get('user') as {
      id: string
      role: string
    }

    if (user.role !== 'SELLER') {
      return c.json(
        {
          message:
            'Only sellers can view orders',
        },
        403,
      )
    }

    const orders =
      await prisma.orderItem.findMany({
        where: {
          book: {
            sellerId: user.id,
          },
        },
        include: {
          book: true,
          order: {
            include: {
              user: true,
            },
          },
        },
      })

    return c.json(orders)
  } catch (error) {
    console.error(error)

    return c.json(
      {
        message:
          'Failed to fetch seller orders',
      },
      500,
    )
  }
}