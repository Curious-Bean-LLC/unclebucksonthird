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
    <div className='overflow-hidden flex flex-row items-start gap-4'>
      {item.itemImage && (
        <img
          src={item.itemImage}
          alt={item.itemName}
          className='w-40 h-40 object-cover shrink-0'
        />
      )}
      <div className='p-4 flex flex-col flex-1'>
        <div className='flex flex-row items-center justify-between gap-4 mb-2'>
          <h3 className='text-lg font-bold text-ub-orange text-left'>
            {item.itemName}
          </h3>
          <p className='text-2xl font-bold text-ub-orange shrink-0'>
            ${item.itemPrice}
          </p>
        </div>
        <p className='text-[9px] md:text-xs text-gray-700 mb-2 text-left'>
          {item.itemDescription}
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
