import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Blog } from './pages/Blog.jsx'

//import router
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

// create a query client
const queryClient = new QueryClient()

//define routes
const router = createBrowserRouter([
  {
    path: '/', //root of the application
    element: <Blog />, //got othe "blog" component
  },
])

export function App() {
  return (
    //call router provider instead of the <blog/> component directly
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  )
}
