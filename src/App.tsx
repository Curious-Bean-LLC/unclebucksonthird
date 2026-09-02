import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { PageContainer } from './PageContainer'
import Home from './pages/Home'
import Admin from './pages/Admin'
import ErrorBoundary from './ErrorBoundary'

import CMS from "decap-cms-app";
// Initialize the CMS object
CMS.init();
// Now the registry is available via the CMS object.
// CMS.registerPreviewTemplate("my-template", MyTemplate);

const router = createBrowserRouter([
  {
    path: '/admin',
    element: <Admin />,
    errorElement: <ErrorBoundary />,
  },
  {
    path: '/',
    element: <PageContainer />,
    errorElement: <ErrorBoundary />,
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
