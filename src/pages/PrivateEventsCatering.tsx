import PrivateSpace1 from '/images/private-space-1.jpeg'
import PrivateSpace2 from '/images/private-space-2.jpeg'
import PrivateSpace3 from '/images/private-space-3.jpeg'

export default function PrivateEventsCatering() {
  return (
    <div className='flex flex-col items-center gap-15 md:px-15'>
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

      <p>
        Let's make it a party to remember! We offer parties that are late-night
        party space reserves to semi-private affairs to grand, 500 people
        buyouts! Please fill out the form with as much info as possible. Please
        share the party size, desires, requests and questions. We will reply via
        email to begin the process. *Please use RESERVATIONS when available to
        book your table.
      </p>

      <div>
        <h1>Schedule a Private Event</h1>
        <p>
          Contact us today to learn more about our private event catering
          services and to schedule a consultation.
        </p>
      </div>

      <form
        name='private'
        method='POST'
        data-netlify='true'
        className='text-left w-full px-10'
      >
        <input type='hidden' name='form-name' value='private' />
        <p>
          <label>
            Full Name <span className='text-ub-orange'>*</span>{' '}
          </label>
          <input required type='text' name='name' />
        </p>
        <p>
          <label>
            Email <span className='text-ub-orange'>*</span>{' '}
          </label>
          <input required type='email' name='email' />
        </p>
        <p>
          <label>
            Phone Number <span className='text-ub-orange'>*</span>{' '}
          </label>
          <input required type='tel' name='phone' />
        </p>
        <p>
          <label>Company</label>
          <input type='text' name='company' />
        </p>
        <p>
          <label>
            Event Date <span className='text-ub-orange'>*</span>{' '}
          </label>
          <input required type='date' name='date' />
        </p>
        <p>
          <label>
            Event Time <span className='text-ub-orange'>*</span>{' '}
          </label>
          <input required type='time' name='time' />
        </p>
        <p>
          <label>Duration</label>
          <input type='text' name='duration' />
        </p>
        <p>
          <label>
            Occasion <span className='text-ub-orange'>*</span>{' '}
          </label>
          <select required name='occasion'>
            <option value='anniversary'>Anniversary</option>
            <option value='baby'>Baby Shower</option>
            <option value='bachelor'>Bachelor Party</option>
            <option value='bachelorette'>Bachelorette Party</option>
            <option value='birthday'>Birthday</option>
            <option value='bridal'>Bridal Shower</option>
            <option value='corporate'>Corporate Event</option>
            <option value='engagement'>Engagement Party</option>
            <option value='family'>Family Reunion</option>
            <option value='graduation'>Graduation</option>
            <option value='holiday'>Holiday Party</option>
            <option value='other'>Other</option>
            <option value='quinceanera'>Quinceañera</option>
            <option value='repast'>Repast/Memorial Service Reception</option>
            <option value='retirement'>Retirement Party</option>
            <option value='wedding'>Wedding</option>
          </select>
        </p>

        <p>
          <label>
            Number of Guests <span className='text-ub-orange'>*</span>{' '}
          </label>
          <input required type='number' name='guests' />
        </p>
        <p>
          <label>
            Budget per Person <span className='text-ub-orange'>*</span>{' '}
          </label>
          <input required type='number' name='budget' />
        </p>
        <p>
          <label>Description / Requests</label>
          <textarea name='description'></textarea>
        </p>
        <p>
          <label>How did you hear about us? </label>
          <select name='referral'>
            <option value='search'>Search Engine</option>
            <option value='social'>Social Media</option>
            <option value='email'>Email Newsletter</option>
            <option value='wom'>Word of Mouth</option>
            <option value='existing'>I'm an existing customer</option>
            <option value='other'>Other</option>
          </select>
        </p>

        <p>
          <button
            className='bg-ub-orange text-ub-white py-4 px-6 rounded hover:bg-ub-dark'
            type='submit'
          >
            Send
          </button>
        </p>
      </form>
    </div>
  )
}
