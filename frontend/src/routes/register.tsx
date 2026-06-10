import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useForm } from '@tanstack/react-form'
import { useMutation } from '@tanstack/react-query'
import { signupUser } from '../api/auth'
import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { toast } from 'sonner'
import axios from 'axios'

export const Route = createFileRoute('/register')({
  component: Register,
})

function Register() {
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()
  const signupMutation = useMutation({
  mutationFn: signupUser,
 onSuccess: (data) => {
    toast.success(
      data.message || 'Signup successful',
    )

    form.reset()
    setTimeout(() => {
    navigate({
      to: '/login',
    })
  }, 1500)
  },

  onError: (error) => {
    if (axios.isAxiosError(error)) {
      toast.error(
        error.response?.data?.message ||
          'Signup failed',
      )
    } else {
      toast.error('Something went wrong')
    }
}})

  const form = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
       role: 'BUYER' as 'BUYER' | 'SELLER',
    },
   onSubmit: async ({ value }) => {
  await signupMutation.mutateAsync(value)
},
  })

  return (
   <div className="w-full max-w-md mx-auto px-3 sm:px-4 mt-4 sm:mt-6 md:mt-10">
  <div className="border p-4 md:p-6 rounded-lg shadow bg-white">
      <h1 className="text-xl sm:text-2xl font-bold mb-6 text-center">
        Create Account
      </h1>

      <form
        onSubmit={(e) => {
          e.preventDefault()
          form.handleSubmit()
        }}
      >
        {/* Name */}
        <form.Field
          name="name"
          validators={{
            onChange: ({ value }) =>
              !value ? 'Name is required' : undefined,
          }}
        >
          {(field) => (
            <div className="mb-4">
              <label className="block mb-1">
                Name
              </label>

              <input
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
        <form.Field name="role">
  {(field) => (
    <div className="mb-4">
      <label className="block mb-1">
        Role
      </label>

      <select
        className="border w-full p-2 rounded"
        value={field.state.value}
        onChange={(e) =>
          field.handleChange(
            e.target.value as
              | 'BUYER'
              | 'SELLER',
          )
        }
      >
        <option value="BUYER">
          Buyer
        </option>

        <option value="SELLER">
          Seller
        </option>
      </select>
    </div>
  )}
</form.Field>

        {/* Password */}
        <form.Field
          name="password"
          validators={{
            onChange: ({ value }) =>
              value.length < 6
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
          Register
        </button>
      </form>
    </div>
    </div>
  )
}