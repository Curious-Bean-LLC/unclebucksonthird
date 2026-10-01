import { useEffect, useState } from 'react'

interface ContentItem {
  title: string
  order: number
  image?: string
}

interface ContentData {
  frontmatter: ContentItem
  body: string
}

interface ContentBlockDisplayProps {
  folder: 'about' | 'reservations' | 'private_events' | 'home'
  vibrant?: boolean
}

// Simple frontmatter parser
function parseFrontmatter(content: unknown) {
  let contentString = typeof content === 'string' ? content : ''

  if (typeof content === 'object' && content !== null && 'default' in content) {
    contentString = (content as any).default
  }

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

  frontmatterText.split('\n').forEach((line) => {
    const [key, ...valueParts] = line.split(':')
    if (key && valueParts.length > 0) {
      const value = valueParts.join(':').trim()
      const trimmedKey = key.trim()

      // Parse number values
      if (value && !isNaN(Number(value))) {
        data[trimmedKey] = Number(value)
      } else {
        data[trimmedKey] = value
      }
    }
  })

  return { data, body }
}

export default function ContentBlockDisplay({
  folder,
  vibrant = true,
}: ContentBlockDisplayProps) {
  const [contentBlocks, setContentBlocks] = useState<ContentData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadContent = async () => {
      try {
        const modules = import.meta.glob('../_content/*/*.md', {
          as: 'raw',
        })
        const data: ContentData[] = []

        for (const [path, importFn] of Object.entries(modules)) {
          if (path.includes(`_content/${folder}`)) {
            const content = await (importFn as () => Promise<string>)()
            const { data: frontmatter, body } = parseFrontmatter(content)
            data.push({
              frontmatter: frontmatter as unknown as ContentItem,
              body,
            })
          }
        }

        // Sort by order field
        data.sort(
          (a, b) => (a.frontmatter.order ?? 999) - (b.frontmatter.order ?? 999)
        )

        setContentBlocks(data)
      } catch (error) {
        console.error(`Error loading content for ${folder}:`, error)
      } finally {
        setLoading(false)
      }
    }

    loadContent()
  }, [folder])

  if (loading) {
    return <div className='text-center py-8'>Loading content...</div>
  }

  if (contentBlocks.length === 0) {
    return <div className='text-center text-gray-600 py-8'>No content available.</div>
  }

  if (!vibrant) {
    // Original simple layout
    return (
      <div className='flex flex-col gap-8'>
        {contentBlocks.map((block, idx) => (
          <div key={idx} className='flex flex-col md:flex-row gap-6 items-start'>
            {block.frontmatter.image && (
              <div className='shrink-0 w-full md:w-64'>
                <img
                  src={block.frontmatter.image}
                  alt={block.frontmatter.title}
                  className='w-full h-auto rounded-lg object-cover'
                />
              </div>
            )}

            <div className='flex-1'>
              <h2>{block.frontmatter.title}</h2>
              <div className='space-y-4 mt-4'>
                {block.body.split('\n\n').map((paragraph, pIdx) => (
                  paragraph.trim() && (
                    <p key={pIdx} className='text-lg leading-relaxed'>
                      {paragraph.trim()}
                    </p>
                  )
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  // Vibrant layout with color blocks and alternating positions
  const colors = ['ub-orange', 'ub-dark']

  return (
    <div className='flex flex-col gap-0'>
      {contentBlocks.map((block, idx) => {
        const colorIndex = idx % 2
        const bgColor = colors[colorIndex]
        const imageOnLeft = idx % 2 === 0
        const bgColorClass =
          bgColor === 'ub-orange'
            ? 'bg-ub-orange'
            : 'bg-ub-dark'
        const textColorClass = 'text-ub-white'

        return (
          <div
            key={idx}
            className={`flex flex-col ${imageOnLeft ? 'md:flex-row' : 'md:flex-row-reverse'} gap-0`}
          >
            {/* Image side */}
            {block.frontmatter.image && (
              <div className='w-full md:w-1/2 shrink-0'>
                <img
                  src={block.frontmatter.image}
                  alt={block.frontmatter.title}
                  className='w-full h-80 md:h-full object-cover'
                />
              </div>
            )}

            {/* Content side with color block */}
            <div
              className={`w-full ${block.frontmatter.image ? 'md:w-1/2' : 'md:w-full'} ${bgColorClass} ${textColorClass} p-8 md:p-12 flex flex-col justify-center`}
            >
              <h2 className={textColorClass}>{block.frontmatter.title}</h2>
              <div className='space-y-4 mt-4'>
                {block.body.split('\n\n').map((paragraph, pIdx) => (
                  paragraph.trim() && (
                    <p key={pIdx} className='text-lg leading-relaxed'>
                      {paragraph.trim()}
                    </p>
                  )
                ))}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
