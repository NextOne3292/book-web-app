import { createFileRoute, useNavigate } from '@tanstack/react-router'
import {
  useQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query'
import {
  getCart,
  removeCartItem,
   increaseQuantity,
  decreaseQuantity,
} from '../api/cart'
import { toast } from 'sonner'
import {createOrder} from '../api/order'

export const Route = createFileRoute('/cart')({
  component: Cart,
})

function Cart() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const { data: cart, isLoading } =
    useQuery({
      queryKey: ['cart'],
      queryFn: getCart,
    })

  const removeMutation = useMutation({
    mutationFn: removeCartItem,

    onSuccess: () => {
      toast.success(
        'Item removed from cart',
      )

      queryClient.invalidateQueries({
        queryKey: ['cart'],
      })
    },

    onError: () => {
      toast.error(
        'Failed to remove item',
      )
    },
  })
 const increaseMutation = useMutation({
    mutationFn: increaseQuantity,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['cart'],
      })
    },
  })

  const decreaseMutation = useMutation({
    mutationFn: decreaseQuantity,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['cart'],
      })
    },
  })

  const orderMutation = useMutation({
    mutationFn: createOrder,

    onSuccess: () => {
      toast.success(
        'Order placed successfully',
      )

      queryClient.invalidateQueries({
        queryKey: ['cart'],
      })
      navigate({
      to: '/order-success',
    })
    },
   
    onError: () => {
      toast.error(
        'Failed to place order',
      )
    },
  })

  if (isLoading) {
    return (
      <div className="text-center py-10">
        Loading cart...
      </div>
    )
  }

  const total =
    cart?.items?.reduce(
      (
        sum: number,
        item: any,
      ) =>
        sum +
        item.book.price *
          item.quantity,
      0,
    ) || 0

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-8">
        My Cart
      </h1>

      {cart?.items?.length === 0 && (
        <p>Your cart is empty</p>
      )}

      <div className="space-y-4">
        {cart?.items?.map(
          (item: any) => (
            <div
              key={item.id}
              className="border rounded-lg p-4 flex justify-between items-center"
            >
              <div>
                <h2 className="font-semibold">
                  {
                    item.book.title
                  }
                </h2>

                <p>
                  ₹
                  {
                    item.book.price
                  }
                </p>

                <div className="flex items-center gap-3 mt-2">
                  <button
                    onClick={() =>
                      decreaseMutation.mutate(
                        item.id,
                      )
                    }
                    className="bg-gray-200 px-3 py-1 rounded"
                  >
                    -
                  </button>

                  <span>
                    {item.quantity}
                  </span>

                  <button
                    onClick={() =>
                      increaseMutation.mutate(
                        item.id,
                      )
                    }
                    className="bg-gray-200 px-3 py-1 rounded"
                  >
                    +
                  </button>
                </div>
              </div>

              

              <button
                onClick={() =>
                  removeMutation.mutate(
                    item.id,
                  )
                }
                className="bg-red-600 text-white px-4 py-2 rounded"
              >
                Remove
              </button>
            </div>
          ),
        )}
      </div>

      <div className="mt-8 border-t pt-4">
        <h2 className="text-xl font-bold">
          Total: ₹{total}
        </h2>

        <button
  onClick={() =>
    orderMutation.mutate()
  }
  className="mt-4 bg-green-600 text-white px-6 py-2 rounded"
>
  Place Order
</button>
      </div>
    </div>
  )
}