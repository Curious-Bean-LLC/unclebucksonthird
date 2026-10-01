import { useEffect, useState } from 'react'

interface HappyHourItem {
  title: string
  dayOfWeek?: string[]
  startTime?: string
  endTime?: string
}

interface HappyHourData {
  frontmatter: HappyHourItem
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
  const data: Record<string, unknown> = {}

  // Parse YAML-like frontmatter
  let currentKey = ''
  let currentArray: string[] = []
  let inArray = false

  frontmatterText.split('\n').forEach((line) => {
    // Check if this is an array item (starts with -)
    if (line.match(/^\s*-\s/)) {
      if (!inArray) {
        inArray = true
        currentArray = []
      }
      const item = line.replace(/^\s*-\s/, '').trim()
      currentArray.push(item)
    } else if (inArray && line.trim() === '') {
      // End of array
      if (currentKey) {
        data[currentKey] = currentArray
      }
      inArray = false
      currentArray = []
    } else if (line.includes(':')) {
      // End previous array if needed
      if (inArray && currentKey) {
        data[currentKey] = currentArray
        inArray = false
        currentArray = []
      }

      const [key, ...valueParts] = line.split(':')
      if (key && valueParts.length > 0) {
        currentKey = key.trim()
        const value = valueParts.join(':').trim()
        if (value) {
          data[currentKey] = value
        }
      }
    }
  })

  // Handle case where array is at end of file
  if (inArray && currentKey) {
    data[currentKey] = currentArray
  }

  return { data, body }
}

// Format days of week with ampersand, no oxford comma
function formatDays(days: string[]): string {
  if (!days || days.length === 0) return ''
  
  const allDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
  if (days.length === 7 && allDays.every(day => days.includes(day))) {
    return 'Every day'
  }
  
  if (days.length === 1) return days[0]
  if (days.length === 2) return `${days[0]} & ${days[1]}`
  return days.slice(0, -1).join(', ') + ' & ' + days[days.length - 1]
}

// Format time from HH:mm to readable format
function formatTime(time: string): string {
  if (!time) return ''

  // Remove any quotes that might be in the time string
  const cleanTime = time.replace(/['"]/g, '')
  const [hoursStr, minutesStr] = cleanTime.split(':')

  const hour = parseInt(hoursStr, 10)
  if (isNaN(hour) || !minutesStr) return ''

  const minutes = minutesStr.trim()
  const period = hour >= 12 ? 'PM' : 'AM'
  const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour

  return `${displayHour}:${minutes} ${period}`
}

export default function HappyHour() {
  const [happyHours, setHappyHours] = useState<HappyHourData[]>([])
  const [images, setImages] = useState<string[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadHappyHours = async () => {
      try {
        // Load images
        const imageModules = import.meta.glob('../_images/happy_hour/*.md', {
          as: 'raw',
        })
        const imageFiles: string[] = []

        for (const [, importFn] of Object.entries(imageModules)) {
          const content = await (importFn as () => Promise<string>)()
          const { data } = parseFrontmatter(content)
          const imageFile = (data as any).imageFile
          if (imageFile) {
            imageFiles.push(imageFile)
          }
        }

        setImages(imageFiles)

        // Load happy hour specials
        const modules = import.meta.glob('../_happy_hour/*.md', {
          as: 'raw',
        })
        const data: HappyHourData[] = []

        for (const [, importFn] of Object.entries(modules)) {
          const content = await (importFn as () => Promise<string>)()
          const { data: frontmatter, body } = parseFrontmatter(content)
          data.push({
            frontmatter: frontmatter as unknown as HappyHourItem,
            body,
          })
        }

        setHappyHours(data)
      } catch (error) {
        console.error('Error loading happy hours:', error)
      } finally {
        setLoading(false)
      }
    }

    loadHappyHours()
  }, [])

  if (loading) {
    return <div className='text-center py-8'>Loading happy hour info...</div>
  }

  return (
    <div className='flex flex-col gap-8 py-8 px-4'>
      {/* Happy Hour Specials */}
      <div className='max-w-4xl mx-auto w-full order-first md:order-last'>
        {happyHours.length === 0 ? (
          <div className='text-center text-gray-600'>
            <p>No happy hour specials available.</p>
          </div>
        ) : (
        happyHours.map((item, idx) => (
          <div key={idx} className='py-4'>
            <h2>{item.frontmatter.title}</h2>

            {/* Days and Times */}
            {(item.frontmatter.dayOfWeek ||
              item.frontmatter.startTime ||
              item.frontmatter.endTime) && (
              <div className='text-lg mb-4 mt-4'>
                {item.frontmatter.dayOfWeek && (
                  <p className='font-semibold'>
                    {formatDays(item.frontmatter.dayOfWeek)}
                  </p>
                )}
                {(item.frontmatter.startTime ||
                  item.frontmatter.endTime) && (
                  <p>
                    {item.frontmatter.startTime &&
                      formatTime(item.frontmatter.startTime)}
                    {item.frontmatter.startTime &&
                      item.frontmatter.endTime &&
                      ' - '}
                    {item.frontmatter.endTime &&
                      formatTime(item.frontmatter.endTime)}
                  </p>
                )}
              </div>
            )}

            {/* Body Content */}
            {item.body && (
              <div className='prose prose-lg max-w-none mt-4'>{item.body}</div>
            )}
          </div>
        ))
        )}
      </div>

      {/* Image Gallery - Responsive */}
      {images.length > 0 && (
        <div className='flex flex-col md:flex-row gap-4 md:justify-center items-center md:items-stretch pb-4 order-last md:order-first'>
          {images.map((image, idx) => (
            <img
              key={idx}
              src={image}
              alt={`Happy hour image ${idx + 1}`}
              className='h-48 w-auto rounded-lg object-cover'
            />
          ))}
        </div>
      )}
    </div>
  )
}
