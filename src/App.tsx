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
import CMS from 'decap-cms-app'

CMS.init()

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
])

function App() {
  return <RouterProvider router={router} />
}

export default App
