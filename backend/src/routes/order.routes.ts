import { Hono } from 'hono'
import {
  createOrder,
  getOrders,
  getSellerOrders
} from '../controllers/order.controller.js'
import { protect } from '../middleware/auth.middleware.js'

const orderRouter = new Hono()

orderRouter.post('/', protect, createOrder)
orderRouter.get('/', protect, getOrders)
orderRouter.get('/seller',protect,getSellerOrders)

export default orderRouter