import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useQuery, useMutation } from '@tanstack/react-query'
import { getBookById } from '../api/book'
import { addToCart } from '../api/cart'
import { toast } from 'sonner'

export const Route = createFileRoute('/book/$bookId')({
  component: BookDetails,
})

function BookDetails() {
  const navigate = useNavigate()
  const { bookId } = Route.useParams()

  const { data: book, isLoading } = useQuery({
    queryKey: ['book', bookId],
    queryFn: () => getBookById(bookId),
  })

  const addToCartMutation = useMutation({
    mutationFn: addToCart,

    onSuccess: () => {
      toast.success('Book added to cart')

      navigate({
        to: '/cart',
      })
    },

    onError: (error) => {
      console.log(error)
      toast.error('Failed to add to cart')
    },
  })

  if (isLoading) {
    return (
      <div className="text-center py-10">
        Loading...
      </div>
    )
  }

  if (!book) {
    return (
      <div className="text-center py-10">
        Book not found
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <div className="border rounded-lg p-6">
        <img
          src={book.imageUrl}
          alt={book.title}
          className="w-full max-h-96 object-contain"
        />

        <h1 className="text-3xl font-bold mt-6">
          {book.title}
        </h1>

        <p className="mt-2 text-gray-600">
          Author: {book.author}
        </p>

        <p className="mt-4">
          {book.description}
        </p>

        <p className="text-2xl font-bold mt-4">
          ₹{book.price}
        </p>

        <p className="mt-4">
          Seller: {book.seller.name}
        </p>

        <button
          onClick={() =>
            addToCartMutation.mutate(book.id)
          }
          className="mt-6 bg-green-600 text-white px-6 py-2 rounded"
        >
          Add To Cart
        </button>
      </div>
    </div>
  )
}