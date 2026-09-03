import { FaSearchLocation } from 'react-icons/fa'
import HomeVideo from '/videos/home-video.mp4'
export default function Home() {
  return (
    <div key='home-container' className='flex flex-col items-center gap-5'>
      <video src={HomeVideo} autoPlay loop muted className='w-full h-auto' />

      <h1>Hours</h1>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-2 text-center'>
        <div className='text-left my-4'>
          <table className=''>
            <tr>
              <td className='font-black text-ub-orange pr-1'>Monday, Tuesday</td>
              <td className='col-span-2'>
                Open during Fiserv Arena Events or private party requests
              </td>
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
        <div className='bg-ub-orange text-ub-white flex flex-col items-center justify-center gap-5 p-5'>
          <p>
            Please email us at: connect@unclebucksonthird.com for availability
            during off-business hours
          </p>
          <p>HOURS MAY VARY DUE TO SPECIAL AND FISERV ARENA EVENTS</p>
        </div>
      </div>

      <h1>Location</h1>
      <div className='text-center'>
        <p className='font-semibold'>Uncle Bucks</p>
        <p>1125 N Doctor M.L.K Jr. Drive</p>
        <p>Milwaukee, WI 53203</p>
        <div className='text-ub-orange flex items-center justify-center gap-2'>
          {' '}
          <FaSearchLocation />
          <a
            href='https://www.google.com/maps/dir/?api=1&destination=1125+N+Doctor+M.L.K+Jr.+Drive,+Milwaukee,+WI+53203'
            target='_blank'
            rel='noopener noreferrer'
            className=' hover:text-blue-800 underline'
          >
            Get Directions
          </a>
        </div>
      </div>
    </div>
  )
}
