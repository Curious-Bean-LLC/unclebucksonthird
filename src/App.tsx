import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ErrorBoundary from './ErrorBoundary'
import { PageContainer } from './PageContainer'
import Admin from './pages/Admin'
import Home from './pages/Home'

// Initialize the CMS object
// CMS.init()
// Now the registry is available via the CMS object.
// CMS.registerPreviewTemplate('my-template', MyTemplate)

const router = createBrowserRouter([
  {
    path: '/admin',
    element: <Admin key='admin-view' />,
    errorElement: <ErrorBoundary />,
  },
  {
    path: '/',
    element: <PageContainer key='page-container' />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        path: '/',
        element: <Home key='home-view' />,
      },
    ],
  },
])

function App() {
  return <RouterProvider router={router} />
}

// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path='/' element={<PageContainer key='page-container' />}>
//           <Route index element={<Home key='home-view' />} />
//           {/* <Route
//             path='admin'
//             element={<Admin key='admin-view' />}
//             errorElement={<ErrorBoundary />}
//           /> */}
//         </Route>
//       </Routes>
//     </BrowserRouter>
//   )
// }

export default App
