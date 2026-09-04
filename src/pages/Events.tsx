import matter from 'gray-matter'
import { useEffect, useState } from 'react'
import ImageGrid from '../components/ImageGrid'
import { useLoadImages } from '../hooks/useLoadImages'

interface EventFrontmatter {
  layout: string
  title: string
  date: string
  endDate?: string
  flyer?: string
  recurringFrequency?: string
}

interface ParsedEvent {
  frontmatter: EventFrontmatter
  body: string
}

export default function Events() {
  const [recurringEvents, setRecurringEvents] = useState<ParsedEvent[]>([])
  const [onetimeEvents, setOnetimeEvents] = useState<ParsedEvent[]>([])
  const [loading, setLoading] = useState(true)
  const { images } = useLoadImages('events')

  const parseMarkdown = (content: string): ParsedEvent => {
    const { data, content: body } = matter(content)
    return {
      frontmatter: {
        layout: data.layout || '',
        title: data.title || '',
        date: data.date || '',
        endDate: data.endDate,
        flyer: data.flyer,
        recurringFrequency: data.recurringFrequency,
      },
      body: body.trim(),
    }
  }

  useEffect(() => {
    const loadEvents = async () => {
      try {
        // Import all recurring events
        const recurringModules = import.meta.glob(
          '../_events/recurring/*.md',
          { as: 'raw' },
        )
        const recurringData: ParsedEvent[] = []

        for (const [, importFn] of Object.entries(recurringModules)) {
          const content = await (importFn as () => Promise<string>)()
          const parsed = parseMarkdown(content)
          recurringData.push(parsed)
        }

        // Sort recurring events by date
        recurringData.sort(
          (a, b) =>
            new Date(a.frontmatter.date).getTime() -
            new Date(b.frontmatter.date).getTime(),
        )

        // Import all onetime events
        const onetimeModules = import.meta.glob('../_events/onetime/*.md', {
          as: 'raw',
        })
        const onetimeData: ParsedEvent[] = []

        for (const [, importFn] of Object.entries(onetimeModules)) {
          const content = await (importFn as () => Promise<string>)()
          const parsed = parseMarkdown(content)
          onetimeData.push(parsed)
        }

        // Sort onetime events by date (newest first)
        onetimeData.sort(
          (a, b) =>
            new Date(b.frontmatter.date).getTime() -
            new Date(a.frontmatter.date).getTime(),
        )

        setRecurringEvents(recurringData)
        setOnetimeEvents(onetimeData)
      } catch (error) {
        console.error('Error loading events:', error)
      } finally {
        setLoading(false)
      }
    }

    loadEvents()
  }, [])

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

  if (loading) {
    return (
      <div className='flex justify-center items-center min-h-screen'>
        Loading events...
      </div>
    )
  }

  return (
    <div className='flex flex-col items-center gap-12 py-8'>
      <h1>Events</h1>

      {/* Ongoing Events Section */}
      {recurringEvents.length > 0 && (
        <section className='w-full max-w-4xl'>
          <h2 className='text-2xl font-bold mb-8 text-ub-orange'>
            Ongoing Events
          </h2>
          <div className='flex flex-col gap-8'>
            {recurringEvents.map((event, idx) => (
              <div
                key={idx}
                className='border-2 border-ub-orange rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition flex flex-col md:flex-row'
              >
                {event.frontmatter.flyer && (
                  <div className='md:w-2/5 flex-shrink-0'>
                    <img
                      src={event.frontmatter.flyer}
                      alt={event.frontmatter.title}
                      className='w-full h-full object-contain'
                    />
                  </div>
                )}
                <div className='p-6 bg-white flex-1 flex flex-col justify-center'>
                  <h3 className='text-2xl font-bold mb-2 text-ub-orange'>
                    {event.frontmatter.title}
                  </h3>
                  <div className='mb-4 text-sm text-gray-600'>
                    <p>
                      <span className='font-semibold'>Frequency:</span>{' '}
                      {event.frontmatter.recurringFrequency}
                    </p>
                    <p>
                      <span className='font-semibold'>Starts:</span>{' '}
                      {formatDate(event.frontmatter.date)} at{' '}
                      {formatTime(event.frontmatter.date)}
                    </p>
                    {event.frontmatter.endDate && (
                      <p>
                        <span className='font-semibold'>Until:</span>{' '}
                        {formatDate(event.frontmatter.endDate)}
                      </p>
                    )}
                  </div>
                  <div className='prose text-gray-700'>{event.body}</div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* One-Time Events Section */}
      {onetimeEvents.length > 0 && (
        <section className='w-full max-w-4xl'>
          <h2 className='text-2xl font-bold mb-8 text-ub-orange'>
            Upcoming Events
          </h2>
          <div className='flex flex-col gap-8'>
            {onetimeEvents.map((event, idx) => (
              <div
                key={idx}
                className='border-2 border-ub-orange rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition flex flex-col md:flex-row'
              >
                {event.frontmatter.flyer && (
                  <div className='md:w-2/5 flex-shrink-0'>
                    <img
                      src={event.frontmatter.flyer}
                      alt={event.frontmatter.title}
                      className='w-full h-full object-contain'
                    />
                  </div>
                )}
                <div className='p-6 bg-white flex-1 flex flex-col justify-center'>
                  <h3 className='text-2xl font-bold mb-2 text-ub-orange'>
                    {event.frontmatter.title}
                  </h3>
                  <div className='mb-4 text-sm text-gray-600'>
                    <p>
                      <span className='font-semibold'>Date:</span>{' '}
                      {formatDate(event.frontmatter.date)}
                    </p>
                    <p>
                      <span className='font-semibold'>Time:</span>{' '}
                      {formatTime(event.frontmatter.date)}
                    </p>
                  </div>
                  <div className='prose text-gray-700'>{event.body}</div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {recurringEvents.length === 0 && onetimeEvents.length === 0 && (
        <div className='text-center text-gray-600'>
          <p>No events at this time. Check back soon!</p>
        </div>
      )}

      {images.length > 0 && (
        <section className='w-full max-w-4xl mt-12'>
          <h2 className='text-2xl font-bold mb-8 text-ub-orange'>
            Event Gallery
          </h2>
          <ImageGrid images={images} altPrefix='Event' />
        </section>
      )}
    </div>
  )
}
