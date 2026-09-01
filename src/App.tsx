import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { PageContainer } from './PageContainer'
import Home from './pages/Home'

const router = createBrowserRouter([
  {
    path: '/',
    element: <PageContainer />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
    ],
  },
])

function App() {
  return <RouterProvider router={router} />
}

export default App
