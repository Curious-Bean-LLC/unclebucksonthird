import { useEffect, useState } from 'react'
import matter from 'gray-matter'
import PdfMenuPreview from './PdfMenuPreview'
import SpecialItemCard from './SpecialItemCard'

interface MenuItem {
  itemName: string
  itemImage?: string
  itemDescription: string
  itemNote?: string
  itemPrice: string
}

interface MenuSpecial {
  frontmatter: MenuItem
  body: string
}

interface MenuDisplayProps {
  menuFolder: string
  specialsFolder: string
  menuTitle: string
}

export default function MenuDisplay({
  menuFolder,
  specialsFolder,
  menuTitle,
}: MenuDisplayProps) {
  const [menuFile, setMenuFile] = useState<string>('')
  const [specials, setSpecials] = useState<MenuSpecial[]>([])
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
            const { data } = matter(content)
            if (data.menuFile) {
              setMenuFile(data.menuFile)
            }
          }
        }

        // Load specials
        const specialsModules = import.meta.glob(
          '../_menus/specials/*/*.md',
          { as: 'raw' },
        )
        const specialsData: MenuSpecial[] = []

        for (const [path, importFn] of Object.entries(specialsModules)) {
          if (path.includes(`specials/${specialsFolder}`)) {
            const content = await (importFn as () => Promise<string>)()
            const { data } = matter(content)
            specialsData.push({
              frontmatter: data as MenuItem,
              body: content,
            })
          }
        }

        setSpecials(specialsData)
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
      <h1 className='text-center mb-8'>{menuTitle}</h1>

      {/* Two Column Layout: PDF on left, Specials on right */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-12 px-4'>
        {/* PDF Menu Section - Left Column */}
        {menuFile && (
          <section className=''>
            <h2 className='text-2xl font-bold mb-6 text-ub-orange'>Menu</h2>
            <PdfMenuPreview menuFile={menuFile} />
          </section>
        )}

        {/* Specials Section - Right Column */}
        {specials.length > 0 && (
          <section className=''>
            <h2 className='text-2xl font-bold mb-6 text-ub-orange'>
              Featured Specials
            </h2>
            <div className='space-y-4'>
              {specials.map((special, idx) => (
                <SpecialItemCard key={idx} item={special.frontmatter} />
              ))}
            </div>
          </section>
        )}

        {specials.length === 0 && !menuFile && (
          <div className='text-center text-gray-600 md:col-span-2'>
            <p>No menu data available.</p>
          </div>
        )}
      </div>
    </div>
  )
}
