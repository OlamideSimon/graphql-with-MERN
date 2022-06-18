import React from 'react'
import { FaEnvelope, FaPhone, FaIdBadge } from 'react-icons/fa'

const ClientInfo = ({ client }) => {
  return (
    <>
      <p className='mt-10 text-lg text-slate-700'>Client Information</p>
      <ul className='px-5 border-t-2 border-[1px] rounded-md divide-y-2'>
        <li className='flex items-center p-3 text-slate-600 space-x-2'>
          <FaIdBadge /> 
          <p>{client.name}</p>
        </li>
        <li className='flex items-center p-3 text-slate-600 space-x-2'>
          <FaEnvelope />
          <p>{client.email}</p>
        </li>
        <li className='flex items-center p-3 text-slate-600 space-x-2'>
          <FaPhone />
          <p>{client.phone}</p>
        </li>
      </ul>
    </>
  )
}

export default ClientInfo