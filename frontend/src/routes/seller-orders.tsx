
import { createFileRoute } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { getSellerOrders } from '../api/order'

export const Route =
  createFileRoute(
    '/seller-orders',
  )({
    component: SellerOrders,
  })

function SellerOrders() {
  const {
    data: orders,
    isLoading,
  } = useQuery({
    queryKey: ['sellerOrders'],
    queryFn: getSellerOrders,
  })

  if (isLoading) {
    return (
      <div className="text-center py-10">
        Loading...
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-8">
        Sales History
      </h1>

      {orders?.length === 0 && (
        <p>No orders found</p>
      )}

      {orders?.map(
        (item: any) => (
          <div
            key={item.id}
            className="border rounded-lg p-4 mb-4"
          >
            <p>
              <strong>
                Book:
              </strong>{' '}
              {
                item.book.title
              }
            </p>

            <p>
              <strong>
                Buyer:
              </strong>{' '}
              {
                item.order.user
                  .name
              }
            </p>

            <p>
              <strong>
                Email:
              </strong>{' '}
              {
                item.order.user
                  .email
              }
            </p>

            <p>
              <strong>
                Quantity:
              </strong>{' '}
              {
                item.quantity
              }
            </p>

            <p>
              <strong>
                Price:
              </strong>{' '}
              ₹{item.price}
            </p>
          </div>
        ),
      )}
    </div>
  )
}