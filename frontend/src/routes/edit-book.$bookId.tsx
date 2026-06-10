import {
  createFileRoute,
  useNavigate,
} from '@tanstack/react-router'
import {
  useQuery,
  useMutation,
} from '@tanstack/react-query'
import {
  getBookById,
  updateBook,
} from '../api/book'
import { uploadImage } from '../api/upload'
import { useForm } from '@tanstack/react-form'
import { toast } from 'sonner'
import { useState } from 'react'

export const Route = createFileRoute(
  '/edit-book/$bookId',
)({
  component: EditBook,
})

type BookFormData = {
  title: string
  author: string
  description: string
  price: string
  imageUrl: string
}

function EditBook() {
  const { bookId } = Route.useParams()
  const navigate = useNavigate()

  const [file, setFile] =
    useState<File | null>(null)

  const { data: book, isLoading } =
    useQuery({
      queryKey: ['book', bookId],
      queryFn: () =>
        getBookById(bookId),
    })

  const updateMutation = useMutation({
    mutationFn: (
      data: BookFormData,
    ) => updateBook(bookId, data),

    onSuccess: () => {
      toast.success(
        'Book updated successfully',
      )

      navigate({
        to: '/seller-books',
      })
    },

    onError: () => {
      toast.error(
        'Failed to update book',
      )
    },
  })

  const form = useForm({
    defaultValues: {
      title: book?.title || '',
      author: book?.author || '',
      description:
        book?.description || '',
      price: book
        ? String(book.price)
        : '',
      imageUrl: book?.imageUrl || '',
    },

    onSubmit: async ({ value }) => {
      let imageUrl =
        value.imageUrl

      if (file) {
        const uploadResult =
          await uploadImage(file)

        imageUrl =
          uploadResult.imageUrl
      }

      await updateMutation.mutateAsync({
        ...value,
        imageUrl,
      })
    },
  })

  if (isLoading || !book) {
    return (
      <div className="text-center py-10">
        Loading...
      </div>
    )
  }

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">
        Edit Book
      </h1>

      <form
        onSubmit={(e) => {
          e.preventDefault()
          form.handleSubmit()
        }}
      >
        <form.Field name="title">
          {(field) => (
            <input
              className="border w-full p-2 mb-4"
              value={field.state.value}
              onChange={(e) =>
                field.handleChange(
                  e.target.value,
                )
              }
            />
          )}
        </form.Field>

        <form.Field name="author">
          {(field) => (
            <input
              className="border w-full p-2 mb-4"
              value={field.state.value}
              onChange={(e) =>
                field.handleChange(
                  e.target.value,
                )
              }
            />
          )}
        </form.Field>

        <form.Field name="description">
          {(field) => (
            <textarea
              className="border w-full p-2 mb-4"
              value={field.state.value}
              onChange={(e) =>
                field.handleChange(
                  e.target.value,
                )
              }
            />
          )}
        </form.Field>

        <form.Field name="price">
          {(field) => (
            <input
              type="number"
              className="border w-full p-2 mb-4"
              value={field.state.value}
              onChange={(e) =>
                field.handleChange(
                  e.target.value,
                )
              }
            />
          )}
        </form.Field>

        <div className="mb-4">
          <p className="font-medium mb-2">
            Current Image
          </p>

          <img
            src={book.imageUrl}
            alt={book.title}
            className="w-32 h-40 object-cover border rounded mb-3"
          />

          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              setFile(
                e.target.files?.[0] ||
                  null,
              )
            }
          />
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded"
        >
          Update Book
        </button>
      </form>
    </div>
  )
}