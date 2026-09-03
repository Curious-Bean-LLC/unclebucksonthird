import { Link } from 'react-router-dom'
import HomeVideo from '/videos/home-video.mp4'
import PrivateSpace1 from '/images/private-space-1.jpeg'
import PrivateSpace2 from '/images/private-space-2.jpeg'
import PrivateSpace3 from '/images/private-space-3.jpeg'

export default function Home() {
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

      <h1>Private Parties, Events + Catering</h1>
      <button className='bg-ub-orange text-ub-white py-4 px-6 rounded hover:bg-ub-dark'>
        <Link to='/private-events-catering' className=''>
          Book Now
        </Link>
      </button>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-2 text-center'>
        <img
          src={PrivateSpace1}
          alt='Private Event Space 1'
          className='w-full h-auto'
        />
        <img
          src={PrivateSpace2}
          alt='Private Event Space 2'
          className='w-full h-auto'
        />
        <img
          src={PrivateSpace3}
          alt='Private Event Space 3'
          className='w-full h-auto'
        />
      </div>
    </div>
  )
}
