import React from 'react'
import { FaTrash } from 'react-icons/fa'
import { useMutation } from '@apollo/client'
import { DELETE_CLIENT } from '../mutations/clientMutations'
import { GET_CLIENTS } from '../queries/clientQueries'
import { GET_PROJECTS } from '../queries/projectQueries'

const ClientRow = ({ client }) => {
  const [ deleteClient ] = useMutation(DELETE_CLIENT, {
    variables: { id: client.id },
    refetchQueries: [{ query: GET_CLIENTS }, { query: GET_PROJECTS }]
    // update(cache, { data: { deleteClient } }) {
    //   const { clients } = cache.readQuery({ query: GET_CLIENTS});
    //   cache.writeQuery({
    //     query: GET_CLIENTS,
    //     data: { clients: clients.filter(client => client.id !== deleteClient.id) },
    //   })
    // }
  })

  return (
    <tr className='border-b-2 hover:bg-slate-200'>
        <td className='p-3'>{client.name}</td>
        <td className='p-3'>{client.email}</td>
        <td className='p-3'>{client.phone}</td>
        <td className='px-2'>
            <button onClick={deleteClient} className='bg-red-500 focus:border-red-300 focus:border-2 text-white text-sm p-2 rounded'>
              <FaTrash />
            </button>
        </td>
    </tr>
  )
}

export default ClientRow