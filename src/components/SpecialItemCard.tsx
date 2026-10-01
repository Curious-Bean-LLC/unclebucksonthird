interface MenuItem {
  itemName: string
  itemImage?: string
  itemDescription: string
  itemNote?: string
  itemPrice: string
}

interface SpecialItemCardProps {
  item: MenuItem
  isWeeklySpecial?: boolean
}

export default function SpecialItemCard({
  item,
  isWeeklySpecial = false,
}: SpecialItemCardProps) {
  return (
    <div
      className={`flex flex-col p-4 rounded-xl shadow-2xl ${
        isWeeklySpecial
          ? 'bg-ub-orange text-ub-white'
          : 'bg-ub-white text-ub-dark'
      }`}
    >
      {isWeeklySpecial && (
        <span className='text-ub-dark px-3 py-1 text-xs font-bold rounded mb-3 w-full text-center uppercase tracking-widest'>
          Weekly Special
        </span>
      )}
      <div className='overflow-hidden flex flex-col md:flex-row gap-4'>
        {item.itemImage && (
          <img
            src={item.itemImage}
            alt={item.itemName}
            className='w-40 h-40 object-cover shrink-0'
          />
        )}
        <div className='flex flex-col flex-1'>
          <div className='flex flex-row items-center justify-between gap-4 mb-2'>
            <h3
              className={`text-lg font-bold ${
                isWeeklySpecial ? 'text-ub-white' : 'text-ub-orange'
              }  text-left capitalize`}
            >
              {item.itemName}
            </h3>
            <h3 className={`text-2xl font-bold shrink-0`}>{item.itemPrice}</h3>
          </div>
          <p className='text-[9px] md:text-xs text-ub-dark mb-2 text-left'>
            {item.itemDescription.replaceAll('"', '')}
          </p>
          {item.itemNote && (
            <p className='text-[9px] md:text-xs text-ub-dark italic text-left'>
              {item.itemNote}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
