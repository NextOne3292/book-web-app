import { createFileRoute, Link, } from '@tanstack/react-router'
import { useQuery, useMutation } from '@tanstack/react-query'
import { getAllBooks } from '../api/book'
import { addToCart } from '../api/cart'
import { toast } from 'sonner'

export const Route = createFileRoute('/books')({
  component: Books,
})

function Books() {
  const addToCartMutation = useMutation({
  mutationFn: addToCart,

  onSuccess: () => {
    toast.success('Book added to cart')
  },

  onError: (error) => {
    console.log(error)
    toast.error('Failed to add to cart')
  },
})
  const { data: books, isLoading } = useQuery({
    queryKey: ['books'],
    queryFn: getAllBooks,
  })

  if (isLoading) {
    return (
      <div className="text-center py-10">
        Loading books...
      </div>
    )
  }

  return (
    
    <div className="max-w-6xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold text-center mb-10">
        Books Collection
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {books?.map((book: any) => (
          <div
            key={book.id}
            className="border rounded-lg shadow hover:shadow-lg overflow-hidden bg-white"
          >
            <div className="h-56 bg-gray-100 flex items-center justify-center p-4">
              <img
                src={book.imageUrl}
                alt={book.title}
                className="max-h-full max-w-full object-contain"
              />
            </div>

            <div className="p-4">
              <h2 className="text-xl font-semibold">
                {book.title}
              </h2>

              <p className="text-gray-600">
                {book.author}
              </p>

              <p className="text-lg font-bold mt-2">
                ₹{book.price}
              </p>

              <div className="mt-4 flex gap-2">
                <Link
                  to="/book/$bookId"
                  params={{
                    bookId: book.id,
                  }}
                  className="flex-1 border border-blue-600 text-blue-600 py-2 rounded text-center"
                >
                  View Details
                </Link>

                <button
  onClick={() =>
    addToCartMutation.mutate(book.id)
  }
  className="flex-1 bg-green-600 text-white py-2 rounded text-center"
>
  Add To Cart
</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    
    
  )
}