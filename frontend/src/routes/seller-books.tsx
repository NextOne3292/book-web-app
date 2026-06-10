import { createFileRoute, Link } from '@tanstack/react-router'
import {
  useQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query'
import {
  getSellerBooks,
  deleteBook,
} from '../api/book'
import { toast } from 'sonner'

export const Route = createFileRoute(
  '/seller-books',
)({
  component: SellerBooks,
})

function SellerBooks() {
  const queryClient = useQueryClient()

  const { data: books, isLoading } =
    useQuery({
      queryKey: ['seller-books'],
      queryFn: getSellerBooks,
    })

  const deleteMutation = useMutation({
    mutationFn: deleteBook,

    onSuccess: () => {
      toast.success(
        'Book deleted successfully',
      )

      queryClient.invalidateQueries({
        queryKey: ['seller-books'],
      })
    },

    onError: () => {
      toast.error(
        'Failed to delete book',
      )
    },
  })

  if (isLoading) {
    return (
      <div className="text-center py-10">
        Loading...
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto py-8 px-4">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
        <h1 className="text-3xl font-bold">
          My Books
        </h1>

        <Link
          to="/add-book"
          className="bg-blue-600 text-white px-5 py-2 rounded"
        >
          Add Book
        </Link>
      </div>

      {books?.length === 0 && (
        <div className="text-center py-10">
          No books found
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {books?.map((book: any) => (
          <div
            key={book.id}
            className="border rounded-lg shadow overflow-hidden"
          >
            <img
              src={book.imageUrl}
              alt={book.title}
              className="w-full h-56 object-cover"
            />

            <div className="p-4">
              <h2 className="font-bold text-lg">
                {book.title}
              </h2>

              <p className="text-gray-600">
                {book.author}
              </p>
              <p className="text-gray-600 mt-2 line-clamp-2">
  {book.description}
</p>

              <p className="font-bold mt-2">
                ₹{book.price}
              </p>

              <div className="flex gap-2 mt-4">
                <Link
  to="/edit-book/$bookId"
  params={{
    bookId: book.id,
  }}
  className="flex-1 bg-yellow-500 text-white py-2 rounded text-center"
>
  Edit
</Link>

                <button
                  onClick={() =>
                    deleteMutation.mutate(
                      book.id,
                    )
                  }
                  className="flex-1 bg-red-600 text-white py-2 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}