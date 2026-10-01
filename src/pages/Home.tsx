import ContentBlockDisplay from '../components/ContentBlockDisplay'
import ImageGrid from '../components/ImageGrid'
import { useLoadImages } from '../hooks/useLoadImages'
import HomeVideo from '/videos/home-video.mp4'

export default function Home() {
  const { images: homeImages } = useLoadImages('home')

  return (
    <div key='home-container' className='flex flex-col items-center gap-15'>
      <video src={HomeVideo} autoPlay loop muted className='w-full h-auto' />

      <div className='max-w-full'>
        <ContentBlockDisplay folder='home' vibrant={true} />
      </div>

      {homeImages.length > 0 && (
        <section className='w-full'>
          <ImageGrid images={homeImages} altPrefix='Home' />
        </section>
      )}
    </div>
  )
}
