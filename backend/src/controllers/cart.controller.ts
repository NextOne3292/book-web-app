import { prisma } from '../lib/prisma.js'
import type { Context } from 'hono'

export const addToCart = async (c: Context) => {
  try {
const { bookId, quantity } =
  await c.req.json()

const user = c.get('user')


if (user.role !== 'BUYER') {
  return c.json(
    {
      message: 'Only buyers can add books to cart',
    },
    403,
  )
}
const userId = user.id

    if (!bookId) {
      return c.json(
        { message: 'bookId is required' },
        400,
      )
    }

    let cart = await prisma.cart.findUnique({
      where: { userId },
    })

    if (!cart) {
      cart = await prisma.cart.create({
        data: {
          userId,
        },
      })
    }

   const existingItem =
  await prisma.cartItem.findFirst({
    where: {
      cartId: cart.id,
      bookId,
    },
  })

if (existingItem) {
  const updatedItem =
    await prisma.cartItem.update({
      where: {
        id: existingItem.id,
      },
      data: {
        quantity:
          existingItem.quantity + 1,
      },
    })

  return c.json({
    message: 'Cart updated',
    cartItem: updatedItem,
  })
}

const cartItem =
  await prisma.cartItem.create({
    data: {
      cartId: cart.id,
      bookId,
      quantity: quantity || 1,
    },
  })

    return c.json(
      {
        message: 'Book added to cart',
        cartItem,
      },
      201,
    )
  } catch (error) {
    console.error(error)

    return c.json(
      {
        message: 'Failed to add to cart',
      },
      500,
    )
  }
}

export const getCart = async (c: Context) => {
  try {
   const user = c.get('user')
   

if (user.role !== 'BUYER') {
  return c.json(
    {
      message: 'Only buyers can access cart',
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

    if (!cart) {
      return c.json(
        {
          message: 'Cart not found',
        },
        404,
      )
    }

    return c.json(cart)
  } catch (error) {
    console.error(error)

    return c.json(
      {
        message: 'Failed to fetch cart',
      },
      500,
    )
  }
}

export const removeCartItem = async (c: Context) => {
  try {
     const user = c.get('user')

    if (user.role !== 'BUYER') {
      return c.json(
        {
          message:
            'Only buyers can remove cart items',
        },
        403,
      )
    }
    const id = c.req.param('id')

    await prisma.cartItem.delete({
      where: { id },
    })

    return c.json({
      message: 'Cart item removed',
    })
  } catch (error) {
    console.error(error)

    return c.json(
      {
        message: 'Failed to remove item',
      },
      500,
    )
  }
}
export const increaseQuantity =
  async (c: Context) => {
    try {
        const user = c.get('user')

      if (user.role !== 'BUYER') {
        return c.json(
          {
            message:
              'Only buyers can update cart',
          },
          403,
        )
      }

      const id =
        c.req.param('id')

      const item =
        await prisma.cartItem.update({
          where: { id },
          data: {
            quantity: {
              increment: 1,
            },
          },
        })

      return c.json(item)
    } catch (error) {
      return c.json(
        {
          message:
            'Failed to increase quantity',
        },
        500,
      )
    }
  }
  export const decreaseQuantity =
  async (c: Context) => {
    try {
       const user = c.get('user')

      if (user.role !== 'BUYER') {
        return c.json(
          {
            message:
              'Only buyers can update cart',
          },
          403,
        )
      }
      const id =
        c.req.param('id')

      const item =
        await prisma.cartItem.findUnique({
          where: { id },
        })

      if (!item) {
        return c.json(
          {
            message:
              'Item not found',
          },
          404,
        )
      }

      if (
        item.quantity <= 1
      ) {
        await prisma.cartItem.delete({
          where: { id },
        })

        return c.json({
          message:
            'Item removed',
        })
      }

      const updated =
        await prisma.cartItem.update({
          where: { id },
          data: {
            quantity: {
              decrement: 1,
            },
          },
        })

      return c.json(updated)
    } catch (error) {
      return c.json(
        {
          message:
            'Failed to decrease quantity',
        },
        500,
      )
    }
  }