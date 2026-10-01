import ContentBlockDisplay from '../components/ContentBlockDisplay'
import ImageGrid from '../components/ImageGrid'
import { useLoadImages } from '../hooks/useLoadImages'

export default function About() {
  const { images } = useLoadImages('about')

  return (
    <div className='flex flex-col w-full'>
      <ContentBlockDisplay folder='about' vibrant={true} />

      {images.length > 0 && (
        <section className='w-full mt-12 max-w-4xl mx-auto'>
          <h2>Gallery</h2>
          <ImageGrid images={images} altPrefix='About' />
        </section>
      )}
    </div>
  )
}
