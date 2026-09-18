import { useEffect, useState } from 'react'
import ImageGrid from '../components/ImageGrid'
import EventCard from '../components/EventCard'
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

// Simple frontmatter parser that doesn't require Buffer
function parseFrontmatter(content: unknown) {
  // Handle if content is an object with a default property (from Vite)
  let contentString = typeof content === 'string' ? content : ''

  if (typeof content === 'object' && content !== null && 'default' in content) {
    contentString = (content as any).default
  }

  // Ensure we have a string
  if (typeof contentString !== 'string') {
    console.warn('Content is not a string:', content)
    return { data: {}, body: '' }
  }

  const match = contentString.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/)
  if (!match) {
    return { data: {}, body: contentString }
  }

  const frontmatterText = match[1]
  const body = match[2]
  const data: Record<string, string> = {}

  // Parse YAML-like frontmatter
  frontmatterText.split('\n').forEach((line) => {
    const [key, ...valueParts] = line.split(':')
    if (key && valueParts.length > 0) {
      data[key.trim()] = valueParts.join(':').trim()
    }
  })

  return { data, body }
}

export default function Events() {
  const [recurringEvents, setRecurringEvents] = useState<ParsedEvent[]>([])
  const [onetimeEvents, setOnetimeEvents] = useState<ParsedEvent[]>([])
  const [loading, setLoading] = useState(true)
  const { images } = useLoadImages('events')

  const parseMarkdown = (content: string): ParsedEvent => {
    const { data, body } = parseFrontmatter(content)
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
        const recurringModules = import.meta.glob('../_events/recurring/*.md', {
          as: 'raw',
        })
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

  if (loading) {
    return (
      <div className='flex justify-center items-center min-h-screen'>
        Loading events...
      </div>
    )
  }

  return (
    <div className='flex flex-col items-center gap-12 py-8'>
      {/* Ongoing Events Section */}
      {recurringEvents.length > 0 && (
        <section className='w-full max-w-4xl'>
          <h2 className='text-2xl font-bold mb-8'>Ongoing Events</h2>
          <div className='flex flex-col gap-8'>
            {recurringEvents.map((event, idx) => (
              <EventCard
                key={idx}
                title={event.frontmatter.title}
                date={event.frontmatter.date}
                body={event.body}
                flyer={event.frontmatter.flyer}
                isRecurring={true}
                frequency={event.frontmatter.recurringFrequency}
                endDate={event.frontmatter.endDate}
              />
            ))}
          </div>
        </section>
      )}

      {/* One-Time Events Section */}
      {onetimeEvents.length > 0 && (
        <section className='w-full max-w-4xl'>
          <h2 className='text-2xl font-bold mb-8'>Upcoming Events</h2>
          <div className='flex flex-col gap-8'>
            {onetimeEvents.map((event, idx) => (
              <EventCard
                key={idx}
                title={event.frontmatter.title}
                date={event.frontmatter.date}
                body={event.body}
                flyer={event.frontmatter.flyer}
                isRecurring={false}
              />
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
