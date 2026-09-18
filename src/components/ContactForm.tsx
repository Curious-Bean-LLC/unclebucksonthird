import { FaX } from 'react-icons/fa6'
import { useNavigate, useSearchParams } from 'react-router-dom'

export default function ContactForm() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const isExpanded = searchParams.get('contact') === 'true'

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation()
    navigate('?')
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Form will be submitted via Netlify
    const form = e.currentTarget as HTMLFormElement
    form.submit()
  }

  if (!isExpanded) {
    return null
  }

  return (
    <div
      className='fixed inset-0 bg-black bg-opacity-10 z-50 flex items-center justify-center'
      onClick={handleClose}
    >
      <div
        className='bg-white rounded-lg overflow-hidden shadow-2xl max-w-2xl w-[90vw] max-h-[85vh] overflow-y-auto'
        onClick={(e) => e.stopPropagation()}
      >
        <div className='flex justify-between items-center sticky top-0 bg-white border-b-2 border-ub-orange p-4'>
          <div className='flex items-center gap-4 flex-shrink-0'>
            <img
              src='/images/brand-assets/logo.png'
              alt='Uncle Bucks Logo'
              className='h-12 w-auto'
            />
            <h2 className='text-2xl font-bold'>Contact Us</h2>
          </div>
          <button
            type='button'
            onClick={handleClose}
            className='text-3xl font-bold bg-ub-orange hover:bg-ub-dark rounded transition w-8 h-8 flex items-center justify-center'
          >
            <FaX />
          </button>
        </div>

        <form
          name='contact'
          method='POST'
          data-netlify='true'
          onSubmit={handleSubmit}
          className='p-6 flex flex-col gap-6'
        >
          <input type='hidden' name='form-name' value='contact' />
          <div>
            <label className='block mb-2 font-semibold text-ub-dark'>
              Name <span className='text-ub-orange'>*</span>
            </label>
            <input
              required
              type='text'
              name='name'
              className='w-full px-4 py-2 border-2 border-gray-300 rounded focus:outline-none focus:border-ub-orange'
            />
          </div>
          <div>
            <label className='block mb-2 font-semibold text-ub-dark'>
              Email or Phone Number <span className='text-ub-orange'>*</span>
            </label>
            <input
              required
              type='text'
              name='contact_info'
              placeholder='your@email.com or (555) 123-4567'
              className='w-full px-4 py-2 border-2 border-gray-300 rounded focus:outline-none focus:border-ub-orange'
            />
          </div>
          <div>
            <label className='block mb-2 font-semibold text-ub-dark'>
              Type of Inquiry <span className='text-ub-orange'>*</span>
            </label>
            <select
              required
              name='inquiry_type'
              className='w-full px-4 py-2 border-2 border-gray-300 rounded focus:outline-none focus:border-ub-orange'
            >
              <option value=''>Select an option</option>
              <option value='hiring'>Hiring</option>
              <option value='general_question'>General Question</option>
              <option value='feedback'>Feedback</option>
              <option value='private_party'>Private Party</option>
              <option value='catering'>Catering</option>
              <option value='public_event'>Public Event</option>
              <option value='other'>Other</option>
            </select>
          </div>
          <div>
            <label className='block mb-2 font-semibold text-ub-dark'>
              Message <span className='text-ub-orange'>*</span>
            </label>
            <textarea
              required
              name='message'
              rows={5}
              className='w-full px-4 py-2 border-2 border-gray-300 rounded focus:outline-none focus:border-ub-orange'
            />
          </div>

          <button
            type='submit'
            className='bg-ub-orange text-white font-bold py-3 px-6 rounded hover:bg-ub-dark transition'
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  )
}
