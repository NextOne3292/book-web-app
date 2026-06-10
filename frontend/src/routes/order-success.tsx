import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/order-success')({
  component: OrderSuccess,
})

function OrderSuccess() {
  return (
    <div className="max-w-xl mx-auto text-center py-20 px-4">
      <h1 className="text-4xl font-bold text-green-600 mb-4">
        ✅ Order Placed Successfully
      </h1>

      <p className="text-lg mb-8">
        Thank you for your purchase.
      </p>

      <Link
        to="/books"
        className="bg-blue-600 text-white px-6 py-3 rounded"
      >
        Continue Shopping
      </Link>
    </div>
  )
}