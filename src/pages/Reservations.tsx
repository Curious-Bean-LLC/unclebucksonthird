import ImageGrid from '../components/ImageGrid'
import { useLoadImages } from '../hooks/useLoadImages'

export default function Reservations() {
  const { images } = useLoadImages('reservations')

  return (
    <div className='flex flex-col items-center gap-8'>
      <h1>Reservations</h1>
      <p>Make a reservation for your next visit!</p>

      {images.length > 0 && (
        <div className='w-full max-w-4xl px-4'>
          <ImageGrid images={images} altPrefix='Reservations' />
        </div>
      )}
      
      <div className='flex flex-col gap-4'>
        <a
          href='https://tables.toasttab.com/restaurants/4b4d1073-0d16-4617-b560-4d1f47f06184/findTime'
          target='_blank'
          rel='noopener noreferrer'
          className='bg-ub-orange text-ub-white py-4 px-6 rounded hover:bg-ub-dark text-center'
        >
          Make a Reservation
        </a>
        <a
          href='https://tables.toasttab.com/restaurants/4b4d1073-0d16-4617-b560-4d1f47f06184/joinWaitlist'
          target='_blank'
          rel='noopener noreferrer'
          className='bg-ub-orange text-ub-white py-4 px-6 rounded hover:bg-ub-dark text-center'
        >
          Join the Waitlist
        </a>
      </div>
    </div>
  )
}
