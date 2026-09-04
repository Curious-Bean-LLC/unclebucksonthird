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

      <h1>Hours</h1>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-2 text-center'>
        <div className='text-left my-4'>
          <table className='loose-table'>
            <tr>
              <td className='font-black text-ub-orange pr-1'>
                Monday, Tuesday
              </td>
              <td>Open during Fiserv Arena Events or private party requests</td>
            </tr>
            <tr>
              <td className='font-black text-ub-orange pr-1'>Wednesday</td>
              <td>11 AM - 11 PM</td>
            </tr>
            <tr>
              <td className='font-black text-ub-orange pr-1'>Thursday</td>
              <td>11 AM - 11 PM</td>
            </tr>
            <tr>
              <td className='font-black text-ub-orange pr-1'>Friday</td>
              <td>11 AM - 2:30 AM</td>
            </tr>
            <tr>
              <td className='font-black text-ub-orange pr-1'>Saturday</td>
              <td>11 AM - 2:30 AM</td>
            </tr>
            <tr>
              <td className='font-black text-ub-orange pr-1'>Sunday</td>
              <td>11 AM - 11 PM</td>
            </tr>
          </table>
        </div>
        <div className='border-2 border-ub-orange flex flex-col items-center justify-center gap-5 p-5'>
          <p>
            Please email us at: connect@unclebucksonthird.com for availability
            during off-business hours
          </p>
          <p>HOURS MAY VARY DUE TO SPECIAL AND FISERV ARENA EVENTS</p>
        </div>
      </div>

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
