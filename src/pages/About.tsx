import ImageGrid from '../components/ImageGrid'
import { useLoadImages } from '../hooks/useLoadImages'

export default function About() {
  const { images } = useLoadImages('about')

  return (
    <div className='flex flex-col items-center gap-12'>
      <h1>About Page</h1>
      <p>This is the About page of the application.</p>
      {images.length > 0 && <ImageGrid images={images} altPrefix='About' />}
    </div>
  )
}
