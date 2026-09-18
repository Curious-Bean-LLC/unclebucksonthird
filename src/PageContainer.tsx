import {
  FaArrowCircleRight,
  FaBars,
  FaEnvelope,
  FaFacebook,
  FaInstagram,
  FaPhone,
  FaSearchLocation,
  FaYelp,
} from 'react-icons/fa'
import {
  Link,
  NavLink,
  Outlet,
  useNavigate,
  useLocation,
} from 'react-router-dom'
import { useState } from 'react'
import ContactForm from './components/ContactForm'

export default function PageContainer() {
  const navigate = useNavigate()
  const location = useLocation()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Map route paths to display names
  const getPageName = () => {
    const path = location.pathname
    if (path === '/') return ''
    if (path === '/menu') return 'Menu'
    if (path === '/beer') return 'Beer'
    if (path === '/wine') return 'Wine'
    if (path === '/private-events-catering') return 'Private Parties + Catering'
    if (path === '/events') return 'Events'
    if (path === '/reservations') return 'Reservations'
    if (path === '/about') return 'About'
    return ''
  }

  const currentPageName = getPageName()
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

      {/* Mobile Hamburger Menu */}
      <div className='md:hidden w-full p-4 bg-ub-dark text-ub-white'>
        <div className='flex items-center justify-between gap-4'>
          <div
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className='text-2xl flex items-center gap-4'
          >
            <FaBars className='text-ub-orange flex-shrink-0' />
            <h1 className='text-ub-white'>
              {currentPageName && `${currentPageName}`}
              {!currentPageName && 'Home'}
            </h1>
          </div>
          <div className='flex gap-4 items-center justify-center'>
            <a
              href='https://facebook.com'
              target='_blank'
              rel='noopener noreferrer'
              className='text-xl text-ub-orange'
            >
              <FaFacebook />
            </a>
            <a
              href='https://instagram.com'
              target='_blank'
              rel='noopener noreferrer'
              className='text-xl text-ub-orange'
            >
              <FaInstagram />
            </a>
            <a
              href='https://yelp.com'
              target='_blank'
              rel='noopener noreferrer'
              className='text-xl text-ub-orange'
            >
              <FaYelp />
            </a>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <nav className='flex flex-col items-center gap-4 py-4 rounded-lg text-2xl'>
            <NavLink
              to='/menu'
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) => (isActive ? 'text-ub-orange' : '')}
            >
              Menu
            </NavLink>
            <NavLink
              to='/beer'
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) => (isActive ? 'text-ub-orange' : '')}
            >
              Beer
            </NavLink>
            <NavLink
              to='/wine'
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) => (isActive ? 'text-ub-orange' : '')}
            >
              Wine
            </NavLink>
            <NavLink
              to='/private-events-catering'
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) => (isActive ? 'text-ub-orange' : '')}
            >
              Private Parties + Catering
            </NavLink>
            <NavLink
              to='/events'
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) => (isActive ? 'text-ub-orange' : '')}
            >
              Events
            </NavLink>
            <NavLink
              to='/reservations'
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) => (isActive ? 'text-ub-orange' : '')}
            >
              Reservations
            </NavLink>
            <NavLink
              to='/about'
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) => (isActive ? 'text-ub-orange' : '')}
            >
              About
            </NavLink>
          </nav>
        )}
      </div>

      {/* Desktop Navigation */}
      <nav
        id='nav'
        className='nav hidden md:flex flex-col md:flex-row gap-2 md:gap-5 items-center'
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

      <ContactForm />

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
            <div className='flex items-center justify-center gap-2'>
              <FaPhone className='text-ub-orange' />
              (414)-988-0355
            </div>
            <div className='flex items-center justify-center gap-2'>
              <FaEnvelope className='text-ub-orange' />
              connect@unclebucksonthird.com
            </div>
            <div
              onClick={() => navigate('?contact=true')}
              className='flex items-center justify-center gap-2 hover:underline hover:pointer transition'
            >
              Contact Us
              <FaArrowCircleRight className='text-ub-orange' />
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
