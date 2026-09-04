import {
  FaEnvelope,
  FaFacebook,
  FaInstagram,
  FaPhone,
  FaSearchLocation,
  FaYelp,
} from 'react-icons/fa'
import { Link, NavLink, Outlet } from 'react-router-dom'

export default function PageContainer() {
  return (
    <div
      id='main-content'
      className='flex flex-col items-center min-h-screen pt-5 gap-10'
    >
      <div>
        <Link to='/'>
          <img
            src='/images/brand-assets/logo.png'
            alt='Logo'
            className='w-60 h-auto'
          />
        </Link>
      </div>

      <nav
        id='nav'
        className='nav flex flex-col md:flex-row gap-2 md:gap-5 items-center'
      >
        <NavLink
          to='/menu'
          className={({ isActive }) => (isActive ? 'text-ub-orange' : '')}
          style={({ isActive }) => ({
            color: isActive ? 'var(--color-ub-orange)' : 'var(--color-ub-dark)',
            fontSize: '1.5rem',
          })}
        >
          Menu
        </NavLink>
        <NavLink
          to='/beer'
          className={({ isActive }) => (isActive ? 'text-ub-orange' : '')}
          style={({ isActive }) => ({
            color: isActive ? 'var(--color-ub-orange)' : 'var(--color-ub-dark)',
            fontSize: '1.5rem',
          })}
        >
          Beer
        </NavLink>
        <NavLink
          to='/wine'
          className={({ isActive }) => (isActive ? 'text-ub-orange' : '')}
          style={({ isActive }) => ({
            color: isActive ? 'var(--color-ub-orange)' : 'var(--color-ub-dark)',
            fontSize: '1.5rem',
          })}
        >
          Wine
        </NavLink>
        <NavLink
          to='/private-events-catering'
          className={({ isActive }) => (isActive ? 'text-ub-orange' : '')}
          style={({ isActive }) => ({
            color: isActive ? 'var(--color-ub-orange)' : 'var(--color-ub-dark)',
            fontSize: '1.5rem',
          })}
        >
          Private Parties + Catering
        </NavLink>
        <NavLink
          to='/events'
          className={({ isActive }) => (isActive ? 'text-ub-orange' : '')}
          style={({ isActive }) => ({
            color: isActive ? 'var(--color-ub-orange)' : 'var(--color-ub-dark)',
            fontSize: '1.5rem',
          })}
        >
          Events
        </NavLink>
        <NavLink
          to='/reservations'
          className={({ isActive }) => (isActive ? 'text-ub-orange' : '')}
          style={({ isActive }) => ({
            color: isActive ? 'var(--color-ub-orange)' : 'var(--color-ub-dark)',
            fontSize: '1.5rem',
          })}
        >
          Reservations
        </NavLink>
        <NavLink
          to='/about'
          className={({ isActive }) => (isActive ? 'text-ub-orange' : '')}
          style={({ isActive }) => ({
            color: isActive ? 'var(--color-ub-orange)' : 'var(--color-ub-dark)',
            fontSize: '1.5rem',
          })}
        >
          About
        </NavLink>
        <div className='flex gap-4 items-center justify-center'>
          <a
            href='https://facebook.com'
            target='_blank'
            rel='noopener noreferrer'
            className='text-xl text-ub-orange hover:text-ub-dark'
            style={{ fontSize: '1.5rem', color: 'var(--color-ub-orange)' }}
          >
            <FaFacebook />
          </a>
          <a
            href='https://instagram.com'
            target='_blank'
            rel='noopener noreferrer'
            className='text-xl text-ub-orange hover:text-ub-dark'
            style={{ fontSize: '1.5rem', color: 'var(--color-ub-orange)' }}
          >
            <FaInstagram />
          </a>
          <a
            href='https://yelp.com'
            target='_blank'
            rel='noopener noreferrer'
            className='text-xl text-ub-orange hover:text-ub-dark'
            style={{ fontSize: '1.5rem', color: 'var(--color-ub-orange)' }}
          >
            <FaYelp />
          </a>
        </div>
      </nav>

      <main className='flex-1 w-full p-4 text-center'>
        {/* Children routes will render inside the Outlet */}
        <Outlet />
      </main>

      <footer className='bg-ub-dark text-ub-white border-t-6 border-ub-orange w-full p-4 text-center flex gap-4 flex-col md:flex-row justify-around items-center text-sm'>
        <div>
          <h2
            className='text-ub-white'
            style={{ color: 'var(--color-ub-white)', fontSize: '2rem' }}
          >
            Uncle Buck's on Third
          </h2>
          {/* <p>Milwaukee, WI</p> */}
        </div>

        <div className='flex flex-col md:flex-row items-center gap-4'>
          <div>
            {/* <h2>Contact</h2> */}
            <div className='flex items-center justify-center gap-2'>
              <FaPhone className='text-ub-orange' />
              (414)-988-0355
            </div>
            <div className='flex items-center justify-center gap-2'>
              <FaEnvelope className='text-ub-orange' />
              connect@unclebucksonthird.com
            </div>
          </div>

          <div className='text-center'>
            {/* <h2>Uncle Bucks</h2> */}
            <p style={{ color: 'var(--color-ub-white)' }}>
              1125 N Doctor M.L.K Jr. Drive
            </p>
            <p style={{ color: 'var(--color-ub-white)' }}>
              Milwaukee, WI 53203
            </p>
            <div className='text-white flex items-center justify-center gap-2'>
              {' '}
              <FaSearchLocation className='text-ub-orange' />
              <a
                href='https://www.google.com/maps/dir/?api=1&destination=1125+N+Doctor+M.L.K+Jr.+Drive,+Milwaukee,+WI+53203'
                target='_blank'
                rel='noopener noreferrer'
                className=' hover:text-ub-orange underline'
                style={{ color: 'var(--color-ub-white)' }}
              >
                Get Directions
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
