import 'dotenv/config'
import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { cors } from 'hono/cors'

import authRouter from './routes/auth.routes'
import bookRouter from './routes/book.routes'
import cartRouter from './routes/cart.routes'
import orderRouter from './routes/order.routes'
import uploadRouter from './routes/upload.routes'

const app = new Hono()

app.use(
  '*',
 cors({
  origin: '*',
  allowMethods: [
    'GET',
    'POST',
    'PUT',
    'DELETE',
    'PATCH',
  ],
  allowHeaders: [
    'Content-Type',
    'Authorization',
  ],
}),
)

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.route('/auth', authRouter)
app.route('/books', bookRouter)
app.route('/cart', cartRouter)
app.route('/orders', orderRouter)
app.route('/upload', uploadRouter)

serve(
  {
    fetch: app.fetch,
    port: Number(process.env.PORT) || 3000,
  },
  (info) => {
    console.log(
      `Server is running on http://localhost:${info.port}`,
    )
  },
)