interface ImageGridProps {
  images: string[]
  altPrefix?: string
}

export default function ImageGrid({ images, altPrefix = 'Image' }: ImageGridProps) {
  if (!images.length) return null

  return (
    <div className='w-full'>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 md:gap-2 justify-items-center'>
        {images.map((imageSrc, idx) => (
          <img
            key={idx}
            src={imageSrc}
            alt={`${altPrefix} ${idx + 1}`}
            className='w-full max-w-xs h-auto object-cover rounded'
          />
        ))}
      </div>
    </div>
  )
}
