import { Link } from 'react-router-dom'
import HomeVideo from '/videos/home-video.mp4'
import ImageGrid from '../components/ImageGrid'
import { useLoadImages } from '../hooks/useLoadImages'

export default function Home() {
  const { images: homeImages } = useLoadImages('home')
  const { images: cateringImages } = useLoadImages('catering')
  const previewCateringImages = cateringImages.slice(0, 3)

  return (
    <div key='home-container' className='flex flex-col items-center gap-15'>
      <video src={HomeVideo} autoPlay loop muted className='w-full h-auto' />

      {homeImages.length > 0 && (
        <section className='w-full'>
          <ImageGrid images={homeImages} altPrefix='Home' />
        </section>
      )}

      <h1>Private Parties, Events + Catering</h1>
      <button
        className='bg-ub-orange text-ub-white py-4 px-6 rounded hover:bg-ub-dark'
        style={{ color: 'var(--color-ub-white)' }}
      >
        <Link to='/private-events-catering' className=''>
          Book Now
        </Link>
      </button>
      <ImageGrid
        images={previewCateringImages}
        altPrefix='Private Event Space'
      />
    </div>
  )
}
