import React from 'react'
import { useQuery } from '@apollo/client'
import ClientRow from './ClientRow'
import { GET_CLIENTS } from '../queries/clientQueries'
import Spinner from './Spinner'

const Clients = () => {
    const {loading, error, data} = useQuery(GET_CLIENTS)

    if(loading) return <Spinner />
    if (error) return <p>Something went wrong</p>

  return (
    <>
        {!loading && !error && (
            <div className='md:px-40'>
                <table className='table-auto mt-3 text-left'>
                    <thead className='border-b-2'>
                        <tr>
                            <th className='p-3'>Name</th>
                            <th className='p-3'>Email</th>
                            <th className='p-3'>Phone</th>
                            <th className='p-3'></th>
                        </tr>
                    </thead>
                    <tbody className=''>
                        {data.clients.map((client) => (
                            <ClientRow key={client.id} client={client} />
                        ))}
                    </tbody>
                </table>
            </div>
        )}
    </>
  )
}

export default Clients