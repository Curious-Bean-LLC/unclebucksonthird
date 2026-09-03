import { Link, Outlet } from 'react-router-dom'
import { FaFacebook, FaInstagram, FaYelp } from 'react-icons/fa'

export default function PageContainer() {
  return (
    <div className='flex flex-col items-center min-h-screen pt-5 gap-5'>
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
        <Link to='/menu'>Menu</Link>
        <Link to='/beer'>Beer</Link>
        <Link to='/wine'>Wine</Link>
        <Link to='/private-events-catering'>Private Parties + Catering</Link>
        <Link to='/events'>Events</Link>
        <Link to='/reservations'>Reservations</Link>
        <Link to='/about'>About</Link>
      </nav>
      <div className='flex gap-4 items-center justify-center opacity-70 hover:opacity-100 transition-opacity'>
        <a
          href='https://facebook.com'
          target='_blank'
          rel='noopener noreferrer'
          className='text-xl hover:opacity-80 text-orange-700'
        >
          <FaFacebook />
        </a>
        <a
          href='https://instagram.com'
          target='_blank'
          rel='noopener noreferrer'
          className='text-xl hover:opacity-80 text-orange-700'
        >
          <FaInstagram />
        </a>
        <a
          href='https://yelp.com'
          target='_blank'
          rel='noopener noreferrer'
          className='text-xl hover:opacity-80 text-orange-700'
        >
          <FaYelp />
        </a>
      </div>
      <main style={{ padding: '1rem' }}>
        {/* Children routes will render inside the Outlet */}
        <Outlet />
      </main>
    </div>
  )
}
