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
    <div className='flex flex-col items-center min-h-screen pt-5 gap-10'>
      <div>
        <Link to='/'>
          <img
            src='/images/brand-assets/logo.png'
            alt='Logo'
            className='w-60 h-auto'
          />
        </Link>
      </div>

      <nav className='flex flex-col md:flex-row gap-2 md:gap-5 items-center'>
        <NavLink
          to='/menu'
          className={({ isActive }) => (isActive ? 'text-ub-orange' : '')}
        >
          Menu
        </NavLink>
        <NavLink
          to='/beer'
          className={({ isActive }) => (isActive ? 'text-ub-orange' : '')}
        >
          Beer
        </NavLink>
        <NavLink
          to='/wine'
          className={({ isActive }) => (isActive ? 'text-ub-orange' : '')}
        >
          Wine
        </NavLink>
        <NavLink
          to='/private-events-catering'
          className={({ isActive }) => (isActive ? 'text-ub-orange' : '')}
        >
          Private Parties + Catering
        </NavLink>
        <NavLink
          to='/events'
          className={({ isActive }) => (isActive ? 'text-ub-orange' : '')}
        >
          Events
        </NavLink>
        <NavLink
          to='/reservations'
          className={({ isActive }) => (isActive ? 'text-ub-orange' : '')}
        >
          Reservations
        </NavLink>
        <NavLink
          to='/about'
          className={({ isActive }) => (isActive ? 'text-ub-orange' : '')}
        >
          About
        </NavLink>
      </nav>

      <div className='flex gap-4 items-center justify-center transition-opacity'>
        <a
          href='https://facebook.com'
          target='_blank'
          rel='noopener noreferrer'
          className='text-xl text-ub-orange hover:text-ub-dark'
        >
          <FaFacebook />
        </a>
        <a
          href='https://instagram.com'
          target='_blank'
          rel='noopener noreferrer'
          className='text-xl text-ub-orange hover:text-ub-dark'
        >
          <FaInstagram />
        </a>
        <a
          href='https://yelp.com'
          target='_blank'
          rel='noopener noreferrer'
          className='text-xl text-ub-orange hover:text-ub-dark'
        >
          <FaYelp />
        </a>
      </div>

      <main className='flex-1 w-full p-4 text-center'>
        {/* Children routes will render inside the Outlet */}
        <Outlet />
      </main>

      <footer className='bg-ub-dark text-ub-white border-t-6 border-ub-orange w-full p-4 text-center flex gap-4 flex-col md:flex-row justify-around items-center text-sm'>
        {/* <table className='tight-table max-w-sm text-left border-ub-white border-2'>
          <tr>
            <th colSpan={2} className='text-center'>
              <h2>Hours</h2>
            </th>
          </tr>
          <tr>
            <td className='font-black pr-1'>Monday, Tuesday</td>
            <td>
              Open during Fiserv Arena Events or private party requests
            </td>
          </tr>
          <tr>
            <td className='font-black pr-1'>Wednesday</td>
            <td>11 AM - 11 PM</td>
          </tr>
          <tr>
            <td className='font-black pr-1'>Thursday</td>
            <td>11 AM - 11 PM</td>
          </tr>
          <tr>
            <td className='font-black pr-1'>Friday</td>
            <td>11 AM - 2:30 AM</td>
          </tr>
          <tr>
            <td className='font-black pr-1'>Saturday</td>
            <td>11 AM - 2:30 AM</td>
          </tr>
          <tr>
            <td className='font-black pr-1'>Sunday</td>
            <td>11 AM - 11 PM</td>
          </tr>
        </table> */}
        <div>
          <h2 className='text-ub-white'>Uncle Buck's on Third</h2>
          {/* <p>Milwaukee, WI</p> */}
        </div>

        <div className='flex flex-col md:flex-row items-center gap-4'>
          <div>
            {/* <h2>Contact</h2> */}
            <div className='flex items-center justify-center gap-2 hover:text-ub-dark'>
              <FaPhone className='text-ub-orange' />
              (414)-988-0355
            </div>
            <div className='flex items-center justify-center gap-2 hover:text-ub-dark'>
              <FaEnvelope className='text-ub-orange' />
              connect@unclebucksonthird.com
            </div>
          </div>

          <div className='text-center'>
            {/* <h2>Uncle Bucks</h2> */}
            <p>1125 N Doctor M.L.K Jr. Drive</p>
            <p>Milwaukee, WI 53203</p>
            <div className='text-white flex items-center justify-center gap-2'>
              {' '}
              <FaSearchLocation className='text-ub-orange' />
              <a
                href='https://www.google.com/maps/dir/?api=1&destination=1125+N+Doctor+M.L.K+Jr.+Drive,+Milwaukee,+WI+53203'
                target='_blank'
                rel='noopener noreferrer'
                className=' hover:text-ub-dark underline'
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
