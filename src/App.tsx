import { lazy } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ErrorBoundary from './ErrorBoundary'
import PageContainer from './PageContainer'
import About from './pages/About.tsx'
import Drinks from './pages/Drinks.tsx'
import Events from './pages/Events.tsx'
import Food from './pages/Food.tsx'
import Home from './pages/Home.tsx'
import PrivateEventsCatering from './pages/PrivateEventsCatering.tsx'
import Reservations from './pages/Reservations.tsx'
import HappyHour from './pages/HappyHour.tsx'

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
        path: '/food',
        element: <Food key='food-view' />,
      },
      {
        path: '/drinks',
        element: <Drinks key='drinks-view' />,
      },
      {
        path: '/specials',
        element: <HappyHour key='specials-view' />,
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
