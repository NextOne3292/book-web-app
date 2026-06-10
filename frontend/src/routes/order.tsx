import { createFileRoute } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { getOrders } from '../api/order'

export const Route = createFileRoute('/order')({
  component: Orders,
})

function Orders() {
  const { data: orders, isLoading } =
    useQuery({
      queryKey: ['orders'],
      queryFn: getOrders,
    })

  if (isLoading) {
    return (
      <div className="text-center py-10">
        Loading orders...
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-8">
        My Orders
      </h1>

      {orders?.length === 0 && (
        <p>No orders found</p>
      )}

      {orders?.map((order: any) => (
        <div
          key={order.id}
          className="border rounded-lg p-4 mb-4"
        >
          <p className="font-semibold">
            Order ID: {order.id.slice(0, 8)}
          </p>

          <p>
            Total: ₹{order.totalAmount}
          </p>

          <div className="mt-3">
            {order.items.map(
              (item: any) => (
                <div
                  key={item.id}
                  className="border-b py-2"
                >
                  <p>
                    {item.book.title}
                  </p>

                  <p>
                    Qty:{' '}
                    {item.quantity}
                  </p>

                  <p>
                    ₹{item.price}
                  </p>
                </div>
              ),
            )}
          </div>
        </div>
      ))}
    </div>
  )
}