import { Link } from 'react-router-dom'
import HomeVideo from '/videos/home-video.mp4'
import ContentBlockDisplay from '../components/ContentBlockDisplay'
import ImageGrid from '../components/ImageGrid'
import { useLoadImages } from '../hooks/useLoadImages'

export default function Home() {
  const { images: homeImages } = useLoadImages('home')
  const { images: cateringImages } = useLoadImages('catering')
  const previewCateringImages = cateringImages.slice(0, 3)

  return (
    <div key='home-container' className='flex flex-col items-center gap-15'>
      <video src={HomeVideo} autoPlay loop muted className='w-full h-auto' />

      <div className='max-w-4xl mx-auto w-full px-6'>
        <ContentBlockDisplay folder='home' />
      </div>

      {homeImages.length > 0 && (
        <section className='w-full'>
          <ImageGrid images={homeImages} altPrefix='Home' />
        </section>
      )}
    </div>
  )
}
