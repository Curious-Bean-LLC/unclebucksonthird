import { FaClock } from 'react-icons/fa'
import { useNavigate, useSearchParams } from 'react-router-dom'

interface EventCardProps {
  title: string
  date: string
  body: string
  flyer?: string
  isRecurring: boolean
  frequency?: string
  endDate?: string
}

const slugify = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
    .trim()
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

const formatTime = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  })
}

const dateVisual = (dateString: string) => {
  const date = new Date(dateString)
  return (
    <div className='border-4 text-center rounded border-ub-dark max-w-fit min-w-20'>
      <h3
        className='border-b-4 border-ub-dark bg-ub-orange text-ub-white px-2 uppercase'
        aria-label='event-date-month'
      >
        {formatDate(dateString).split(' ')[0].substring(0, 4)}
      </h3>
      <h4 className='text-5xl mb-2' aria-label='event-date-day'>
        {date.getDate()}
      </h4>
    </div>
  )
}

export default function EventCard({
  title,
  date,
  body,
  flyer,
  isRecurring,
  frequency,
  endDate,
}: EventCardProps) {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const eventSlug = slugify(title)
  const isExpanded = searchParams.get('event') === eventSlug

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    navigate(`/events?event=${eventSlug}`)
  }

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation()
    navigate('/events')
  }

  if (isExpanded) {
    return (
      <div
        className='fixed inset-0 bg-black bg-opacity-10 z-50 flex items-center justify-center'
        onClick={handleClose}
      >
        <div
          className='bg-white rounded-lg overflow-hidden shadow-2xl w-[90vw] max-h-[85vh] flex flex-col'
          onClick={(e) => e.stopPropagation()}
        >
          {/* Logo - Always at top */}
          <div className='flex justify-center pt-4 pb-2 bg-white border-b-2 border-gray-200'>
            <img
              src='/images/brand-assets/logo.png'
              alt='Uncle Bucks Logo'
              className='w-40 h-auto'
            />
          </div>

          {/* Main content area - Flyer on left, content on right */}
          <div className='flex flex-col md:flex-row flex-1 min-h-0'>
            {/* Flyer - Left side on md+, top on small screens */}
            {flyer && (
              <div className='w-full md:w-1/2 flex justify-center items-center bg-gray-100 md:border-r border-gray-200'>
                <img
                  src={flyer}
                  alt={title}
                  className='h-full w-full object-contain p-4'
                />
              </div>
            )}

            {/* Content - Right side */}
            <div
              className={`flex flex-col ${flyer ? 'md:w-1/2' : 'w-full'} overflow-y-auto`}
            >
              <div className='p-6 flex flex-col gap-6'>
                {/* Date and Body Row */}
                <div className='flex gap-4'>
                  <div className='flex flex-col gap-2 flex-shrink-0'>
                    <div>{dateVisual(date)}</div>
                    <div className='text-sm text-ub-dark font-semibold flex gap-2 items-center'>
                      <FaClock className='text-ub-orange' />
                      {formatTime(date)}
                    </div>
                  </div>
                  <div className='text-left'>
                    <h2 className='text-xl font-bold text-ub-orange capitalize'>
                      {title}
                    </h2>
                    <div className='prose prose-sm flex-1'>{body}</div>
                  </div>
                </div>

                {/* Recurring Details */}
                {isRecurring && (
                  <div className='text-sm text-left'>
                    <p className='font-semibold'>{frequency}</p>
                    {endDate && (
                      <p className='text-xs text-gray-600'>
                        Until {formatDate(endDate)}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className='rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition cursor-pointer'>
      <div
        className='p-2 md:p-6 bg-white grid grid-cols-4 gap-2'
        onClick={handleClick}
      >
        {/* Row 1, Columns 1-3: Combined container for date + title/body */}
        <div className='col-span-3 flex gap-4'>
          {/* Date and Time */}
          <div className='flex flex-col gap-2 flex-shrink-0'>
            <div>{dateVisual(date)}</div>
            <div className='text-sm text-ub-dark font-semibold flex gap-1 items-center'>
              <FaClock className='text-ub-orange' />
              {formatTime(date)}
            </div>
          </div>

          {/* Title and Body */}
          <div className='flex flex-col flex-1 items-start text-left'>
            <h3 className='text-xl font-bold text-ub-orange capitalize mb-2'>
              {title}
            </h3>
            <div className='prose prose-sm line-clamp-3'>{body}</div>
          </div>
        </div>

        {/* Row 1-2, Column 4: Flyer Preview (spans both rows if recurring, otherwise just one row) */}
        {flyer && (
          <div className={isRecurring ? 'row-span-2 w-full' : 'w-full'}>
            <img
              src={flyer}
              alt={title}
              className='w-full h-full object-cover rounded'
            />
          </div>
        )}

        {/* Row 2, Columns 1-3: Recurring Details (spans 3 columns) */}
        {isRecurring && (
          <div className='col-span-3 text-sm pt-2 text-left'>
            <p className='font-semibold'>{frequency}</p>
            {endDate && <p className='text-xs'>Until {formatDate(endDate)}</p>}
          </div>
        )}
      </div>
    </div>
  )
}
