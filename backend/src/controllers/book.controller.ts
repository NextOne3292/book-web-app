import { prisma } from '../lib/prisma.js'
import type { Context } from 'hono'

export const createBook = async (c: Context) => {
  try {
    const {
  title,
  author,
  description,
  price,
  imageUrl,
} = await c.req.json()

const user = c.get('user')
if (user.role !== 'SELLER') {
  return c.json(
    {
      message: 'Only sellers can create books',
    },
    403,
  )
}

console.log('USER:', user)
const sellerId = user.id

    if (
      !title ||
      !author ||
      !description ||
      !price ||
      !imageUrl 
      
    ) {
      return c.json(
        { message: 'All fields are required' },
        400,
      )
    }

    const book = await prisma.book.create({
      data: {
        title,
        author,
        description,
        price: Number(price),
        imageUrl,
        sellerId,
      },
    })

    return c.json(
      {
        message: 'Book created successfully',
        book,
      },
      201,
    )
  } catch (error) {
    console.error(error)

    return c.json(
      {
        message: 'Failed to create book',
      },
      500,
    )
  }
}

export const getAllBooks = async (c: Context) => {
  try {
   const books = await prisma.book.findMany({
  include: {
    seller: {
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    },
  },
})

    return c.json(books)
  } catch (error) {
    console.error(error)

    return c.json(
      {
        message: 'Failed to fetch books',
      },
      500,
    )
  }
}
export const getSellerBooks = async (c: Context) => {
  try {
    const user = c.get('user')
    if (user.role !== 'SELLER') {
  return c.json(
    {
      message:
        'Only sellers can access this page',
    },
    403,
  )
}

    const books = await prisma.book.findMany({
      where: {
        sellerId: user.id,
      },
    })

    return c.json(books)
  } catch (error) {
    console.error(error)

    return c.json(
      {
        message: 'Failed to fetch seller books',
      },
      500,
    )
  }
}
export const getBookById = async (c: Context) => {
  try {
    const id = c.req.param('id')

    const book = await prisma.book.findUnique({
      where: { id },
      include: {
  seller: {
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
    },
  },
}
    })

    if (!book) {
      return c.json(
        {
          message: 'Book not found',
        },
        404,
      )
    }

    return c.json(book)
  } catch (error) {
    console.error(error)

    return c.json(
      {
        message: 'Failed to fetch book',
      },
      500,
    )
  }
}
export const updateBook = async (c: Context) => {
  try {
    const id = c.req.param('id')

    const {
      title,
      author,
      description,
      price,
      imageUrl,
    } = await c.req.json()

    const existingBook = await prisma.book.findUnique({
  where: { id },
})

if (!existingBook) {
  return c.json(
    {
      message: 'Book not found',
    },
    404,
  )
}

const user = c.get('user')

if (user.role !== 'SELLER') {
  return c.json(
    {
      message: 'Only sellers can update books',
    },
    403,
  )
}

if (existingBook.sellerId !== user.id) {
  return c.json(
    {
      message:
        'You can update only your own books',
    },
    403,
  )
}
    const updatedBook = await prisma.book.update({
      where: { id },
      data: {
        title,
        author,
        description,
        price: price ? Number(price) : undefined,
        imageUrl,
      },
    })

    return c.json({
      message: 'Book updated successfully',
      book: updatedBook,
    })
  } catch (error) {
    console.error(error)

    return c.json(
      {
        message: 'Failed to update book',
      },
      500,
    )
  }
}
export const deleteBook = async (c: Context) => {
  try {
   const id = c.req.param('id')

const existingBook =
  await prisma.book.findUnique({
    where: { id },
  })

if (!existingBook) {
  return c.json(
    {
      message: 'Book not found',
    },
    404,
  )
}

const user = c.get('user')

if (user.role !== 'SELLER') {
  return c.json(
    {
      message: 'Only sellers can delete books',
    },
    403,
  )
}

if (existingBook.sellerId !== user.id) {
  return c.json(
    {
      message:
        'You can delete only your own books',
    },
    403,
  )
}

await prisma.book.delete({
  where: { id },
})
    return c.json({
      message: 'Book deleted successfully',
    })
  } catch (error) {
    console.error(error)

    return c.json(
      {
        message: 'Failed to delete book',
      },
      500,
    )
  }
}