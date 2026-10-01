import ContentBlockDisplay from '../components/ContentBlockDisplay'
import ImageGrid from '../components/ImageGrid'
import { useLoadImages } from '../hooks/useLoadImages'

export default function About() {
  const { images } = useLoadImages('about')

  return (
    <div className='flex flex-col items-center gap-12 max-w-4xl mx-auto p-6'>
      <ContentBlockDisplay folder='about' />

      {images.length > 0 && (
        <section className='w-full mt-12'>
          <h2>Gallery</h2>
          <ImageGrid images={images} altPrefix='About' />
        </section>
      )}
    </div>
  )
}
