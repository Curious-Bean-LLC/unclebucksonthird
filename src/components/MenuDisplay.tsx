import { useEffect, useState } from 'react'
import PdfMenuPreview from './PdfMenuPreview'
import SpecialItemCard from './SpecialItemCard'
import { useLoadMenus } from '../hooks/useLoadMenus'
import { useLoadSpecials } from '../hooks/useLoadSpecials'

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
  const { menuFile, loading: menuLoading } = useLoadMenus(menuFolder)
  const { specials, loading: specialsLoading } = useLoadSpecials(specialsFolder)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Both hooks loaded when menuLoading and specialsLoading are false
    if (!menuLoading && !specialsLoading) {
      setLoading(false)
    }
  }, [menuLoading, specialsLoading])

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
