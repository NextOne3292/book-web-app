import {
  createFileRoute,
  useNavigate,
} from '@tanstack/react-router'
import { useForm } from '@tanstack/react-form'
import { useMutation } from '@tanstack/react-query'
import { uploadImage } from '../api/upload'
import { createBook } from '../api/book'
import { toast } from 'sonner'
import { useState } from 'react'

export const Route = createFileRoute('/add-book')({
  component: AddBook,
})

function AddBook() {
  const [file, setFile] =
    useState<File | null>(null)
    const navigate = useNavigate()

  const uploadMutation = useMutation({
    mutationFn: uploadImage,
  })

  const createBookMutation = useMutation({
    mutationFn: createBook,

   onSuccess: () => {
  toast.success(
    'Book created successfully',
  )

  form.reset()

  navigate({
    to: '/seller-books',
  })
},

    onError: () => {
      toast.error(
        'Failed to create book',
      )
    },
  })

  const form = useForm({
    defaultValues: {
      title: '',
      author: '',
      description: '',
      price: '',
      imageUrl: '',
    },

    onSubmit: async ({ value }) => {
      if (!file) {
        toast.error(
          'Please select an image',
        )
        return
      }

      const uploadResult =
        await uploadMutation.mutateAsync(
          file,
        )

      await createBookMutation.mutateAsync({
        ...value,
        imageUrl:
          uploadResult.imageUrl,
      })
    },
  })

  return (
   <div className="w-full max-w-xl mx-auto my-4 sm:my-10 px-3 sm:px-0">
  <div className="border p-4 sm:p-6 rounded-lg shadow">
      <h1 className="text-xl sm:text-2xl font-bold text-center mb-6">
        Add New Book
      </h1>

      <form
        onSubmit={(e) => {
          e.preventDefault()
          form.handleSubmit()
        }}
      >
        <form.Field
  name="title"
  validators={{
    onChange: ({ value }) =>
      !value.trim()
        ? 'Title is required'
        : undefined,
  }}
>
  {(field) => (
    <>
      <input
        placeholder="Title"
        className="border w-full p-2 rounded mb-1"
        value={field.state.value}
        onChange={(e) =>
          field.handleChange(
            e.target.value,
          )
        }
      />

      {field.state.meta.errors[0] && (
        <p className="text-red-500 text-sm mb-3">
          {field.state.meta.errors[0]}
        </p>
      )}
    </>
  )}
</form.Field>

        <form.Field
  name="author"
  validators={{
    onChange: ({ value }) =>
      !value.trim()
        ? 'Author is required'
        : undefined,
  }}
>
  {(field) => (
    <>
      <input
        placeholder="Author"
        className="border w-full p-2 rounded mb-1"
        value={field.state.value}
        onChange={(e) =>
          field.handleChange(
            e.target.value,
          )
        }
      />

      {field.state.meta.errors[0] && (
        <p className="text-red-500 text-sm mb-3">
          {field.state.meta.errors[0]}
        </p>
      )}
    </>
  )}
</form.Field>

        <form.Field
  name="description"
  validators={{
    onChange: ({ value }) =>
      value.trim().length < 10
        ? 'Description must be at least 10 characters'
        : undefined,
  }}
>
  {(field) => (
    <>
      <textarea
        rows={4}
        placeholder="Description"
        className="border w-full p-2 rounded mb-1"
        value={field.state.value}
        onChange={(e) =>
          field.handleChange(
            e.target.value,
          )
        }
      />

      {field.state.meta.errors[0] && (
        <p className="text-red-500 text-sm mb-3">
          {field.state.meta.errors[0]}
        </p>
      )}
    </>
  )}
</form.Field>

        <form.Field
  name="price"
  validators={{
    onChange: ({ value }) =>
      !value ||
      Number(value) <= 0
        ? 'Enter a valid price'
        : undefined,
  }}
>
  {(field) => (
    <>
      <input
        type="number"
        placeholder="Price"
        className="border w-full p-2 rounded mb-1"
        value={field.state.value}
        onChange={(e) =>
          field.handleChange(
            e.target.value,
          )
        }
      />

      {field.state.meta.errors[0] && (
        <p className="text-red-500 text-sm mb-3">
          {field.state.meta.errors[0]}
        </p>
      )}
    </>
  )}
</form.Field>

        <input
          type="file"
          accept="image/*"
          className="mb-6 w-full text-sm"
          onChange={(e) =>
            setFile(
              e.target.files?.[0] || null,
            )
          }
        />

        <button
  type="submit"
  disabled={
    uploadMutation.isPending ||
    createBookMutation.isPending
  }
  className="w-full bg-blue-600 text-white py-2 sm:py-3 rounded disabled:opacity-50"
>
  {uploadMutation.isPending ||
  createBookMutation.isPending
    ? 'Adding Book...'
    : 'Add Book'}
</button>
      </form>
    </div>
    </div>
  )
}