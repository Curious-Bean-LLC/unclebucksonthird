import ImageGrid from '../components/ImageGrid'
import { useLoadImages } from '../hooks/useLoadImages'

export default function About() {
  const { images } = useLoadImages('about')

  return (
    <div className='flex flex-col items-center gap-12 max-w-4xl mx-auto px-6'>
      <h1>Uncle Buck's on Third</h1>
      
      <div className='prose prose-lg text-gray-700 space-y-6'>
        <p>
          One of Milwaukee's most unique Rooftop Bars with 360 degree views of the city next door to the Fiserv Forum Arena home of the Milwaukee Bucks. We offer the most extensive menu and a full line of catering options for your corporate or private event.
        </p>

        <p>
          We created an authentic rustic Northwoods meets hip east coast themed restaurant & bar nestled right in the heart of downtown Milwaukee's most prominent entertainment area.
        </p>

        <p>
          Our space features an amazing décor as well as trophies from local hunters with top prize Bucks from Wisconsin's own hunter and taxidermist Don Rich.
        </p>

        <p>
          Take in breathtaking rooftop views of the city and enjoy 3 levels of fun from our main dining room that converts to a dance floor after 11pm, our 2nd Floor Sports bar and private room that connects to our Rooftop Fire-Bar with panoramic views of downtown Milwaukee.
        </p>

        <p>
          Our menu features some of the city's best high end pub fare created by CEC Culinary trained Exec Chef Mathew Affholder.
        </p>

        <p className='text-ub-orange font-semibold'>
          Remember, Uncle Buck's is a good place to get lost, and a great place to be found!
        </p>
      </div>

      {images.length > 0 && (
        <section className='w-full mt-12'>
          <h2 className='text-2xl font-bold mb-8 text-ub-orange text-center'>Gallery</h2>
          <ImageGrid images={images} altPrefix='About' />
        </section>
      )}
    </div>
  )
}
