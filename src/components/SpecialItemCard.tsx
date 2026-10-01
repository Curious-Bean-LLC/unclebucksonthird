interface MenuItem {
  itemName: string
  itemImage?: string
  itemDescription: string
  itemNote?: string
  itemPrice: string
}

interface SpecialItemCardProps {
  item: MenuItem
}

export default function SpecialItemCard({ item }: SpecialItemCardProps) {
  return (
    <div className='overflow-hidden flex flex-col md:flex-row items-center gap-4'>
      {item.itemImage && (
        <img
          src={item.itemImage}
          alt={item.itemName}
          className='w-40 h-40 object-cover shrink-0'
        />
      )}
      <div className='flex flex-col flex-1'>
        <div className='flex flex-row items-center justify-between gap-4 mb-2'>
          <h3 className='text-lg font-bold text-ub-orange text-left capitalize'>
            {item.itemName}
          </h3>
          <h3 className='text-2xl font-bold text-ub-dark shrink-0'>
            {item.itemPrice}
          </h3>
        </div>
        <p className='text-[9px] md:text-xs text-gray-700 mb-2 text-left'>
          {item.itemDescription.replaceAll('"', '')}
        </p>
        {item.itemNote && (
          <p className='text-[9px] md:text-xs text-gray-600 italic text-left'>
            {item.itemNote}
          </p>
        )}
      </div>
    </div>
  )
}
