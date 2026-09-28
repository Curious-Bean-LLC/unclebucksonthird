import { useMemo, useState } from 'react'
import {
  FaArrowCircleRight,
  FaBars,
  FaChevronDown,
  FaEnvelope,
  FaFacebook,
  FaInstagram,
  FaPhone,
  FaSearchLocation,
  FaYelp,
} from 'react-icons/fa'
import { FaCircle, FaClock } from 'react-icons/fa6'
import {
  Link,
  NavLink,
  Outlet,
  useLocation,
  useNavigate,
} from 'react-router-dom'
import ContactForm from './components/ContactForm'

const FACEBOOK = 'https://www.facebook.com/unclebucksonthird'
const INSTAGRAM = 'https://www.instagram.com/unclebucksonthird'
const YELP = 'https://www.yelp.com/biz/uncle-bucks-milwaukee'

export default function PageContainer() {
  const navigate = useNavigate()
  const location = useLocation()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [showHours, setShowHours] = useState(false)

  const handleShowHours = () => {
    setShowHours(!showHours)
    console.log(showHours)
  }

  const isOpenNow = useMemo(() => {
    const now = new Date()
    const day = now.getDay() // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
    const hour = now.getHours()
    const minute = now.getMinutes()

    // Define opening hours for each day
    const hours = {
      1: { open: 0, close: 0 }, // Monday: Open during Fiserv Arena Events or private party requests
      2: { open: 0, close: 0 }, // Tuesday: Open during Fiserv Arena Events or private party requests
      3: { open: 11, close: 23 }, // Wednesday: 11 AM - 11 PM
      4: { open: 11, close: 23 }, // Thursday: 11 AM - 11 PM
      5: { open: 11, close: 23 }, // Friday: 11 AM - 11 PM
      6: { open: 11, close: 23 }, // Saturday: 11 AM - 11 PM
      0: { open: 11, close: 23 }, // Sunday: 11 AM - 11 PM
    }

    const todayHours = (hours as any)[day]
    if (todayHours.open === 0 && todayHours.close === 0) {
      return false // Open during events or private party requests
    }
    return hour >= todayHours.open && hour < todayHours.close
  }, [])

  // Map route paths to display names
  const getPageName = () => {
    const path = location.pathname
    if (path === '/') return ''
    if (path === '/about') return 'About'
    if (path === '/food') return 'Food'
    if (path === '/drinks') return 'Drinks'
    if (path === '/specials') return 'Happy Hour'
    if (path === '/events') return 'Events'
    if (path === '/private-events-catering') return 'Private Parties + Catering'
    if (path === '/reservations') return 'Reservations'
    return ''
  }

  const currentPageName = getPageName()
  return (
    <div
      id='main-content'
      className='flex flex-col items-center min-h-screen pt-5'
    >
      <div className='flex flex-col gap-5 justify-center items-center w-full'>
        <Link to='/'>
          <img
            src='/images/brand-assets/logo.png'
            alt='Logo'
            className='w-60 h-auto'
          />
        </Link>
        <div className='w-full bg-ub-orange md:bg-transparent text-ub-white md:p-4'>
          <div className='flex justify-between md:justify-center gap-5'>
            <div>
              <button
                onClick={handleShowHours}
                className='p-2 px-3 flex items-center gap-2'
                style={{ backgroundColor: 'var(--color-ub-orange)' }}
              >
                <FaClock />
                <span>Now: {isOpenNow ? 'Open' : 'Closed'}</span>
                {showHours ? (
                  <FaChevronDown className='rotate-180' />
                ) : (
                  <FaChevronDown />
                )}
              </button>
            </div>
            <div className='flex gap-4 justify-center text-ub-white md:text-ub-dark px-4 pt-3 text-xl'>
              <a href={FACEBOOK} target='_blank' rel='noopener noreferrer'>
                <FaFacebook />
              </a>
              <a href={INSTAGRAM} target='_blank' rel='noopener noreferrer'>
                <FaInstagram />
              </a>
              <a href={YELP} target='_blank' rel='noopener noreferrer'>
                <FaYelp />
              </a>
            </div>
          </div>

          {showHours && (
            <div className='grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-2 text-center p-4'>
              <div className='text-left text-ub-white md:text-ub-dark '>
                <table className='loose-table'>
                  <tr>
                    <td className='font-black text-ub-dark md:text-ub-orange pr-1'>
                      Monday, Tuesday
                    </td>
                    <td>
                      Open during Fiserv Arena Events or private party requests
                    </td>
                  </tr>
                  <tr>
                    <td className='font-black text-ub-dark md:text-ub-orange pr-1'>
                      Wednesday
                    </td>
                    <td>11 AM - 11 PM</td>
                  </tr>
                  <tr>
                    <td className='font-black text-ub-dark md:text-ub-orange pr-1'>
                      Thursday
                    </td>
                    <td>11 AM - 11 PM</td>
                  </tr>
                  <tr>
                    <td className='font-black text-ub-dark md:text-ub-orange pr-1'>
                      Friday
                    </td>
                    <td>11 AM - 2:30 AM</td>
                  </tr>
                  <tr>
                    <td className='font-black text-ub-dark md:text-ub-orange pr-1'>
                      Saturday
                    </td>
                    <td>11 AM - 2:30 AM</td>
                  </tr>
                  <tr>
                    <td className='font-black text-ub-dark md:text-ub-orange pr-1'>
                      Sunday
                    </td>
                    <td>11 AM - 11 PM</td>
                  </tr>
                </table>
              </div>
              <div className='text-ub-white md:text-ub-dark border-2 border-ub-dark md:border-ub-orange flex flex-col items-center justify-center gap-5 p-5'>
                <p>
                  Please email us at: connect@unclebucksonthird.com for
                  availability during off-business hours
                </p>
                <p>HOURS MAY VARY DUE TO SPECIAL + FISERV ARENA EVENTS</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Hamburger Menu */}
      <div className='md:hidden w-full p-4 bg-ub-dark text-ub-white'>
        <div className='flex items-center justify-between gap-4'>
          <div
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className='text-2xl flex items-center gap-4'
          >
            <FaBars className='text-ub-orange flex-shrink-0' />
            <h1 className='text-ub-white text-center'>
              {currentPageName && `${currentPageName}`}
              {!currentPageName && 'Home'}
            </h1>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <nav className='flex flex-col items-center gap-4 py-4 rounded-lg text-2xl'>
            <NavLink
              to='/about'
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) => (isActive ? 'text-ub-orange' : '')}
            >
              About
            </NavLink>
            <NavLink
              to='/food'
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) => (isActive ? 'text-ub-orange' : '')}
            >
              Food
            </NavLink>
            <NavLink
              to='/drinks'
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) => (isActive ? 'text-ub-orange' : '')}
            >
              Drinks
            </NavLink>
            <NavLink
              to='/specials'
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) => (isActive ? 'text-ub-orange' : '')}
            >
              Happy Hour
            </NavLink>
            <NavLink
              to='/events'
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) => (isActive ? 'text-ub-orange' : '')}
            >
              Events
            </NavLink>
            <NavLink
              to='/private-events-catering'
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) => (isActive ? 'text-ub-orange' : '')}
            >
              Private Parties
            </NavLink>
            <NavLink
              to='/reservations'
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) => (isActive ? 'text-ub-orange' : '')}
            >
              Reservations
            </NavLink>
          </nav>
        )}
      </div>

      {/* Desktop Navigation */}
      <nav
        id='nav'
        className='nav hidden md:flex flex-col md:flex-row gap-2 md:gap-3 items-center text-center'
      >
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
        <FaCircle className='text-ub-orange' size='0.5rem' />
        <NavLink
          to='/food'
          className={({ isActive }) => (isActive ? 'text-ub-orange' : '')}
          style={({ isActive }) => ({
            color: isActive ? 'var(--color-ub-orange)' : 'var(--color-ub-dark)',
            fontSize: '1.5rem',
          })}
        >
          Food
        </NavLink>
        <FaCircle className='text-ub-orange' size='0.5rem' />
        <NavLink
          to='/drinks'
          className={({ isActive }) => (isActive ? 'text-ub-orange' : '')}
          style={({ isActive }) => ({
            color: isActive ? 'var(--color-ub-orange)' : 'var(--color-ub-dark)',
            fontSize: '1.5rem',
          })}
        >
          Drinks
        </NavLink>
        <FaCircle className='text-ub-orange' size='0.5rem' />
        <NavLink
          to='/specials'
          className={({ isActive }) => (isActive ? 'text-ub-orange' : '')}
          style={({ isActive }) => ({
            color: isActive ? 'var(--color-ub-orange)' : 'var(--color-ub-dark)',
            fontSize: '1.5rem',
          })}
        >
          Happy Hour
        </NavLink>
        <FaCircle className='text-ub-orange' size='0.5rem' />
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
        <FaCircle className='text-ub-orange' size='0.5rem' />
        <NavLink
          to='/private-events-catering'
          className={({ isActive }) => (isActive ? 'text-ub-orange' : '')}
          style={({ isActive }) => ({
            color: isActive ? 'var(--color-ub-orange)' : 'var(--color-ub-dark)',
            fontSize: '1.5rem',
          })}
        >
          Private Parties
        </NavLink>
        <FaCircle className='text-ub-orange' size='0.5rem' />
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
