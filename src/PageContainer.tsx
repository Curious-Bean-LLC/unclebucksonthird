import { Link, Outlet } from 'react-router-dom'

export const PageContainer = () => {
  return (
    <div>
      <nav>
        <Link to='/'>Home</Link>
      </nav>
      <main style={{ padding: '1rem' }}>
        {/* Children routes will render inside the Outlet */}
        <Outlet />
      </main>
    </div>
  )
}
