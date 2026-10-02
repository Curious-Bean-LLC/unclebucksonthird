import { useEffect, useMemo, useState } from 'react'
import {
  FaArrowCircleRight,
  FaBars,
  FaChevronDown,
  FaEnvelope,
  FaFacebook,
  FaInstagram,
  FaPhone,
  FaSearchLocation,
  FaTripadvisor,
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

interface HourEntry {
  title: string
  day: string[]
  openTime: string
  closeTime: string
  closed: boolean
  notes?: string
}

function parseHoursFrontmatter(content: unknown) {
  let contentString = typeof content === 'string' ? content : ''

  if (typeof content === 'object' && content !== null && 'default' in content) {
    contentString = (content as any).default
  }

  if (typeof contentString !== 'string') {
    return { data: {} as HourEntry, body: '' }
  }

  const match = contentString.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/)
  if (!match) {
    return { data: {} as HourEntry, body: contentString }
  }

  const frontmatterText = match[1]
  const body = match[2]
  const data: any = {}

  const lines = frontmatterText.split('\n')
  let i = 0
  while (i < lines.length) {
    const line = lines[i]
    const colonIdx = line.indexOf(':')
    
    if (colonIdx === -1) {
      i++
      continue
    }

    const key = line.substring(0, colonIdx).trim()
    let value = line.substring(colonIdx + 1).trim()

    if (key === 'day' && value === '') {
      // Handle array format
      const dayArray = []
      i++
      while (i < lines.length && lines[i].startsWith('  - ')) {
        dayArray.push(lines[i].substring(4).trim())
        i++
      }
      data[key] = dayArray
      continue
    } else if (value === 'true' || value === 'false') {
      data[key] = value === 'true'
    } else if (value) {
      data[key] = value
    }

    i++
  }

  return { data, body }
}

const FACEBOOK = 'https://www.facebook.com/unclebucksonthird'
const INSTAGRAM = 'https://www.instagram.com/unclebucksonthird'
const YELP = 'https://www.yelp.com/biz/uncle-bucks-milwaukee'
const TRIPADVISOR = 'https://www.tripadvisor.com/Restaurant_Review-g60097-d19140560-Reviews-Uncle_Bucks_on_Third-Milwaukee_Wisconsin.html'

export default function PageContainer() {
  const navigate = useNavigate()
  const location = useLocation()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [showHours, setShowHours] = useState(false)
  const [hoursData, setHoursData] = useState<HourEntry[]>([])
  const [hoursLoading, setHoursLoading] = useState(true)

  const handleShowHours = () => {
    setShowHours(!showHours)
    console.log(showHours)
  }

  useEffect(() => {
    const loadHours = async () => {
      try {
        const modules = import.meta.glob('./_hours/*.md', {
          as: 'raw',
        })
        console.log('Hours modules found:', Object.keys(modules))
        const hours: HourEntry[] = []

        for (const [path, importFn] of Object.entries(modules)) {
          const content = await (importFn as () => Promise<string>)()
          console.log('Raw content from', path, ':', content)
          const { data } = parseHoursFrontmatter(content)
          console.log('Parsed data from', path, ':', data)
          if (data.day) {
            hours.push(data)
          }
        }

        console.log('Final hours array:', hours)
        setHoursData(hours)
      } catch (error) {
        console.error('Error loading hours:', error)
      } finally {
        setHoursLoading(false)
      }
    }

    loadHours()
  }, [])

  const isOpenNow = useMemo(() => {
    if (hoursLoading || hoursData.length === 0) return false

    const now = new Date()
    const dayName = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ][now.getDay()]
    const currentHour = now.getHours()
    const currentMinute = now.getMinutes()

    // Find the hours entry for today
    const todayEntry = hoursData.find((entry) => entry.day.includes(dayName))
    if (!todayEntry) return false
    if (todayEntry.closed) return false

    // Parse times - handle both 24-hour and 12-hour (AM/PM) formats
    const parseTime = (timeStr: string): { hour: number; min: number } => {
      console.log('Parsing time:', timeStr)
      
      let time = timeStr.trim()
      let hour = 0
      let min = 0
      
      // Check for AM/PM format
      const amPmMatch = time.match(/(\d{1,2}):(\d{2})\s*(AM|PM|am|pm)/i)
      if (amPmMatch) {
        hour = parseInt(amPmMatch[1])
        min = parseInt(amPmMatch[2])
        const period = amPmMatch[3].toUpperCase()
        
        // Convert to 24-hour format
        if (period === 'PM' && hour !== 12) {
          hour += 12
        } else if (period === 'AM' && hour === 12) {
          hour = 0
        }
      } else {
        // Assume 24-hour format
        const timeParts = time.split(':')
        hour = parseInt(timeParts[0])
        min = parseInt(timeParts[1] || '0')
      }
      
      return { hour, min }
    }

    const openTime = parseTime(todayEntry.openTime)
    const closeTime = parseTime(todayEntry.closeTime)
    
    console.log('Today:', dayName, 'Open:', openTime, 'Close:', closeTime, 'Current:', { hour: currentHour, min: currentMinute })
    
    const openTotalMin = openTime.hour * 60 + openTime.min
    const closeTotalMin = closeTime.hour * 60 + closeTime.min
    const currentTotalMin = currentHour * 60 + currentMinute

    // Handle midnight wraparound: if close time is before open time, restaurant closes next day
    let isOpen: boolean
    if (closeTotalMin < openTotalMin) {
      // Crosses midnight (e.g., 11 PM to 2:30 AM)
      // Open if: current >= open time OR current < close time
      isOpen = currentTotalMin >= openTotalMin || currentTotalMin < closeTotalMin
    } else {
      // Same day (e.g., 11 AM to 11 PM)
      // Open if: current >= open time AND current < close time
      isOpen = currentTotalMin >= openTotalMin && currentTotalMin < closeTotalMin
    }
    
    console.log('Is open:', isOpen, '(closeTotalMin < openTotalMin?', closeTotalMin < openTotalMin, ')')
    return isOpen
  }, [hoursLoading, hoursData])

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
        <div className='w-full bg-ub-orange text-ub-white'>
          <div className='flex justify-between items-center gap-5 pr-4'>
            <div>
              <button
                onClick={handleShowHours}
                className='p-2 px-3 flex items-center gap-2 rounded'
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
            <div className='flex gap-4 text-ub-white text-2xl'>
              <a href={FACEBOOK} target='_blank' rel='noopener noreferrer'>
                <FaFacebook />
              </a>
              <a href={INSTAGRAM} target='_blank' rel='noopener noreferrer'>
                <FaInstagram />
              </a>
              <a href={YELP} target='_blank' rel='noopener noreferrer'>
                <FaYelp />
              </a>
              <a href={TRIPADVISOR} target='_blank' rel='noopener noreferrer'>
                <FaTripadvisor />
              </a>
            </div>
          </div>

          {showHours && (
            <div className='grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-2 text-center p-4'>
              <div className='text-left text-ub-white'>
                <table className='loose-table'>
                  <tbody>
                    {hoursData.map((entry, idx) => {
                      const displayDays = entry.day.join(', ')
                      const displayHours = entry.closed
                        ? entry.notes || 'Closed'
                        : `${entry.openTime} - ${entry.closeTime}`.replace(
                            /\b(\d{1,2}):(\d{2})\b/g,
                            (match, hour, min) => {
                              const h = parseInt(hour)
                              const suffix = h >= 12 ? 'PM' : 'AM'
                              const displayHour = h % 12 || 12
                              return `${displayHour}:${min} ${suffix}`
                            }
                          )

                      return (
                        <tr key={idx}>
                          <td className='font-black text-ub-dark pr-1'>{displayDays}</td>
                          <td>{displayHours}</td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
              <div className='text-ub-white border-2 border-ub-dark flex flex-col items-center justify-center gap-5 p-5'>
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
            <FaBars className='text-ub-orange shrink-0' />
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
        className='nav hidden md:flex flex-row gap-3 items-center text-center bg-ub-dark px-8 py-4 justify-center w-full'
      >
        <NavLink
          to='/about'
          className={({ isActive }) => (isActive ? 'text-ub-orange' : '')}
          style={({ isActive }) => ({
            color: isActive ? 'var(--color-ub-orange)' : 'var(--color-ub-white)',
            fontSize: '1.5rem',
          })}
        >
          About
        </NavLink>
        <FaCircle className='text-ub-white' size='0.5rem' />
        <NavLink
          to='/food'
          className={({ isActive }) => (isActive ? 'text-ub-orange' : '')}
          style={({ isActive }) => ({
            color: isActive ? 'var(--color-ub-orange)' : 'var(--color-ub-white)',
            fontSize: '1.5rem',
          })}
        >
          Food
        </NavLink>
        <FaCircle className='text-ub-white' size='0.5rem' />
        <NavLink
          to='/drinks'
          className={({ isActive }) => (isActive ? 'text-ub-orange' : '')}
          style={({ isActive }) => ({
            color: isActive ? 'var(--color-ub-orange)' : 'var(--color-ub-white)',
            fontSize: '1.5rem',
          })}
        >
          Drinks
        </NavLink>
        <FaCircle className='text-ub-white' size='0.5rem' />
        <NavLink
          to='/specials'
          className={({ isActive }) => (isActive ? 'text-ub-orange' : '')}
          style={({ isActive }) => ({
            color: isActive ? 'var(--color-ub-orange)' : 'var(--color-ub-white)',
            fontSize: '1.5rem',
          })}
        >
          Happy Hour
        </NavLink>
        <FaCircle className='text-ub-white' size='0.5rem' />
        <NavLink
          to='/events'
          className={({ isActive }) => (isActive ? 'text-ub-orange' : '')}
          style={({ isActive }) => ({
            color: isActive ? 'var(--color-ub-orange)' : 'var(--color-ub-white)',
            fontSize: '1.5rem',
          })}
        >
          Events
        </NavLink>
        <FaCircle className='text-ub-white' size='0.5rem' />
        <NavLink
          to='/private-events-catering'
          className={({ isActive }) => (isActive ? 'text-ub-orange' : '')}
          style={({ isActive }) => ({
            color: isActive ? 'var(--color-ub-orange)' : 'var(--color-ub-white)',
            fontSize: '1.5rem',
          })}
        >
          Private Parties
        </NavLink>
        <FaCircle className='text-ub-white' size='0.5rem' />
        <NavLink
          to='/reservations'
          className={({ isActive }) => (isActive ? 'text-ub-orange' : '')}
          style={({ isActive }) => ({
            color: isActive ? 'var(--color-ub-orange)' : 'var(--color-ub-white)',
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
