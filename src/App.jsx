import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { RecipeRoot } from './pages/RecipeRoot.jsx'
import { Signup } from './pages/Singup.jsx'
import { Login } from './pages/login.jsx'
import { AuthContextProvider } from './contexts/AuthContext.jsx'

import { RecipeEdit } from './pages/RecipeEdit.jsx'

//import router
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

//bootstrrap
import 'bootstrap/dist/css/bootstrap.min.css'
import { RecipeCreate } from './pages/RecipeCreate.jsx'

// create a query client
const queryClient = new QueryClient()

//define routes
const router = createBrowserRouter([
  {
    path: '/', //root of the application
    element: <RecipeRoot />, //got othe "blog" component
  },
  {
    path: `/edit/:id?`,
    element: <RecipeEdit />,
  },
  {
    path: `/add/?`,
    element: <RecipeCreate />,
  },
  {
    path: `/signup`, //set the route
    element: <Signup />, //display the signup page
  },
  {
    path: `/login`, //set the route
    element: <Login />, //display the signup page
  },
])

export function App() {
  return (
    //wrap the authentication provider with query-engine
    //wrap the route provider with authentication provider
    //call router provider instead of the <blog/> component directly
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <RouterProvider router={router} />
      </AuthContextProvider>
    </QueryClientProvider>
  )
}
