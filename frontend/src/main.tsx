import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

import { routeTree } from './routeTree.gen'
import './index.css'
import { Toaster } from 'sonner'

const router = createRouter({
  routeTree,
})

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
       <Toaster richColors position="top-right" />
    </QueryClientProvider>
  </StrictMode>,
)