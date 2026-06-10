import { Hono } from 'hono'
import {
  addToCart,
  getCart,
  removeCartItem,
  increaseQuantity,
  decreaseQuantity,
} from '../controllers/cart.controller'
import { protect } from '../middleware/auth.middleware'

const cartRouter = new Hono()

cartRouter.post('/add', protect, addToCart)
cartRouter.get('/', protect, getCart)
cartRouter.delete('/item/:id', protect, removeCartItem)
cartRouter.patch( '/increase/:id',protect,increaseQuantity)
cartRouter.patch('/decrease/:id',protect,decreaseQuantity)

export default cartRouter