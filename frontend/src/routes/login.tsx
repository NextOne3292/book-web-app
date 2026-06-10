import { createFileRoute } from '@tanstack/react-router'
import { useForm } from '@tanstack/react-form'
import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { useMutation } from '@tanstack/react-query'
import { loginUser } from '../api/auth'
import { toast } from 'sonner'
import axios from 'axios'


export const Route = createFileRoute('/login')({
  component: Login,
})

function Login() {
  const [showPassword, setShowPassword] = useState(false)
  
  const loginMutation = useMutation({
  mutationFn: loginUser,

  onSuccess: (data) => {
    localStorage.setItem(
      'token',
      data.token,
    )

    const payload = JSON.parse(
      atob(data.token.split('.')[1]),
    )

    toast.success(
      data.message || 'Login successful',
    )

    if (payload.role === 'SELLER') {
  window.location.href =
    '/seller-books'
} else {
  window.location.href =
    '/books'
}
},

  onError: (error) => {
    if (axios.isAxiosError(error)) {
      toast.error(
        error.response?.data?.message ||
          'Login failed',
      )
    } else {
      toast.error('Something went wrong')
    }
  },
})

  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
   onSubmit: async ({ value }) => {
  await loginMutation.mutateAsync(value)
}
  })

  return (
    <div className="w-full max-w-md mx-auto px-3 sm:px-4 mt-4 sm:mt-6 md:mt-10">
  <div className="border p-4 md:p-6 rounded-lg shadow bg-white">
      <h1 className="text-xl sm:text-2xl font-bold mb-6 text-center">
        Login
      </h1>

      <form
        onSubmit={(e) => {
          e.preventDefault()
          form.handleSubmit()
        }}
      >
        {/* Email */}
        <form.Field
          name="email"
          validators={{
            onChange: ({ value }) =>
              !value.includes('@')
                ? 'Enter a valid email'
                : undefined,
          }}
        >
          {(field) => (
            <div className="mb-4">
              <label className="block mb-1">
                Email
              </label>

              <input
                type="email"
                className="border w-full p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={field.state.value}
                onChange={(e) =>
                  field.handleChange(e.target.value)
                }
              />

              {field.state.meta.errors.length > 0 && (
                <p className="text-red-500 text-sm mt-1">
                  {field.state.meta.errors[0]}
                </p>
              )}
            </div>
          )}
        </form.Field>

        {/* Password */}
        <form.Field
          name="password"
          validators={{
            onChange: ({ value }) =>
              value && value.length < 6
                ? 'Password must be at least 6 characters'
                : undefined,
          }}
        >
          {(field) => (
            <div className="mb-6">
              <label className="block mb-1">
                Password
              </label>

              <div className="relative">
                <input
                  type={
                    showPassword
                      ? 'text'
                      : 'password'
                  }
                  className="border w-full p-2 pr-10 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={field.state.value}
                  onChange={(e) =>
                    field.handleChange(
                      e.target.value,
                    )
                  }
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(
                      !showPassword,
                    )
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1"
                >
                  {showPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>

              {field.state.meta.errors.length > 0 && (
                <p className="text-red-500 text-sm mt-1">
                  {field.state.meta.errors[0]}
                </p>
              )}
            </div>
          )}
        </form.Field>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 sm:py-3 rounded hover:bg-blue-700 transition"
        >
          Login
        </button>
      </form>
    </div>
    </div>
  )
}