import React from 'react'
import { FaExclamationTriangle } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div className='flex flex-col space-y-2 justify-center items-center mt-5'>
        <div className='justify-center items-center flex flex-col'>
            <FaExclamationTriangle className='text-red-500' size='5em' />
            <p className='text-3xl'>404</p>
        </div>
        <p className='leading-3'>Sorry, this page does not exist</p>
        <Link to='/' className='bg-pink-500 p-2 rounded-md text-white'>Go back</Link>
    </div>
  )
}

export default NotFound