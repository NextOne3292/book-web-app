import { Hono } from 'hono'
import {
  createOrder,
  getOrders,
  getSellerOrders
} from '../controllers/order.controller'
import { protect } from '../middleware/auth.middleware'

const orderRouter = new Hono()

orderRouter.post('/', protect, createOrder)
orderRouter.get('/', protect, getOrders)
orderRouter.get('/seller',protect,getSellerOrders)

export default orderRouter