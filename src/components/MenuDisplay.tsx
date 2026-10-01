import { useEffect, useState } from 'react'
import PdfMenuPreview from './PdfMenuPreview'
import SpecialItemCard from './SpecialItemCard'

interface MenuItem {
  itemName: string
  itemImage?: string
  itemDescription: string
  itemNote?: string
  itemPrice: string
  isWeeklySpecial?: string | boolean
}

interface MenuSpecial {
  frontmatter: MenuItem
  body: string
}

interface MenuDisplayProps {
  menuFolder: string
  specialsFolder: string
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

export default function MenuDisplay({
  menuFolder,
  specialsFolder,
}: MenuDisplayProps) {
  const [menuFile, setMenuFile] = useState<string>('')
  const [weeklySpecials, setWeeklySpecials] = useState<MenuSpecial[]>([])
  const [regularSpecials, setRegularSpecials] = useState<MenuSpecial[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadMenuAndSpecials = async () => {
      try {
        // Load menu markdown
        const menuModules = import.meta.glob('../_menus/*/*.md', {
          as: 'raw',
        })

        for (const [path, importFn] of Object.entries(menuModules)) {
          if (path.includes(menuFolder)) {
            const content = await (importFn as () => Promise<string>)()
            const { data } = parseFrontmatter(content)
            if (data.menuFile) {
              setMenuFile(data.menuFile)
            }
          }
        }

        // Load specials
        const specialsModules = import.meta.glob('../_specials/*/*.md', {
          as: 'raw',
        })
        const specialsData: MenuSpecial[] = []

        for (const [path, importFn] of Object.entries(specialsModules)) {
          if (path.includes(`${specialsFolder}`)) {
            const content = await (importFn as () => Promise<string>)()
            const { data, body } = parseFrontmatter(content)
            specialsData.push({
              frontmatter: data as unknown as MenuItem,
              body: body,
            })
          }
        }

        // Separate weekly specials from regular specials
        const weekly = specialsData.filter(
          (special) =>
            special.frontmatter.isWeeklySpecial === 'true' ||
            special.frontmatter.isWeeklySpecial === true
        )
        const regular = specialsData.filter(
          (special) =>
            special.frontmatter.isWeeklySpecial !== 'true' &&
            special.frontmatter.isWeeklySpecial !== true
        )

        setWeeklySpecials(weekly)
        setRegularSpecials(regular)
      } catch (error) {
        console.error('Error loading menu:', error)
      } finally {
        setLoading(false)
      }
    }

    loadMenuAndSpecials()
  }, [menuFolder, specialsFolder])

  if (loading) {
    return <div className='text-center py-8'>Loading menu...</div>
  }

  return (
    <div className='flex flex-col py-8'>
      {/* Two Column Layout: PDF on left, Specials on right */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-12 px-4'>

        {/* Specials Section - Left Column */}
        {(weeklySpecials.length > 0 || regularSpecials.length > 0) && (
          <section className=''>
            <div className='space-y-4'>
              {/* Weekly Specials */}
              {weeklySpecials.length > 0 && (
                <div className='space-y-4'>
                  {weeklySpecials.map((special, idx) => (
                    <SpecialItemCard
                      key={`weekly-${idx}`}
                      item={special.frontmatter}
                      isWeeklySpecial={true}
                    />
                  ))}
                </div>
              )}

              {/* Regular Specials */}
              {regularSpecials.length > 0 && (
                <div className='space-y-4'>
                  {regularSpecials.map((special, idx) => (
                    <SpecialItemCard
                      key={`regular-${idx}`}
                      item={special.frontmatter}
                      isWeeklySpecial={false}
                    />
                  ))}
                </div>
              )}
            </div>
          </section>
        )}

        {/* PDF Menu Section - Right Column */}
        {menuFile && (
          <section className=''>
            <PdfMenuPreview menuFile={menuFile} />
          </section>
        )}

        {weeklySpecials.length === 0 &&
          regularSpecials.length === 0 &&
          !menuFile && (
            <div className='text-center text-gray-600 md:col-span-2'>
              <p>No menu data available.</p>
            </div>
          )}
      </div>
    </div>
  )
}
