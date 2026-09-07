import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ErrorBoundary from './ErrorBoundary'
import PageContainer from './PageContainer'
import About from './pages/About'
import Beer from './pages/Beer'
import Events from './pages/Events'
import Home from './pages/Home'
import Menu from './pages/Menu'
import PrivateEventsCatering from './pages/PrivateEventsCatering'
import Reservations from './pages/Reservations'
import Wine from './pages/Wine'
import { lazy } from 'react'

declare global {
  interface Window {
    CMS_MANUAL_INIT: boolean
  }
}

window.CMS_MANUAL_INIT = true

const AdminRoute = lazy(() => import('./cms/AdminRoute.tsx'))

const router = createBrowserRouter([
  {
    path: '/',
    element: <PageContainer key='page-container' />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        path: '/',
        element: <Home key='home-view' />,
      },
      {
        path: '/menu',
        element: <Menu key='menu-view' />,
      },
      {
        path: '/beer',
        element: <Beer key='beer-view' />,
      },
      {
        path: '/wine',
        element: <Wine key='wine-view' />,
      },
      {
        path: '/private-events-catering',
        element: <PrivateEventsCatering key='private-events-catering-view' />,
      },
      {
        path: '/events',
        element: <Events key='events-view' />,
      },
      {
        path: '/reservations',
        element: <Reservations key='reservations-view' />,
      },
      {
        path: '/about',
        element: <About key='about-view' />,
      },
    ],
  },
  {
    path: '/admin/*',
    element: <AdminRoute key='admin-route' />,
  },
  {
    path: '*',
    element: <ErrorBoundary />, // TODO maybe this should be its own not found page
  },
])

function App() {
  return <RouterProvider router={router} />
}

export default App
