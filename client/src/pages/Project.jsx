import { useQuery } from '@apollo/client'
import { Link, useParams } from 'react-router-dom'
import React from 'react'
import Spinner from '../components/Spinner'
import { GET_PROJECT } from '../queries/projectQueries'
import ClientInfo from '../components/ClientInfo'
import DeleteProjectButton from '../components/DeleteProjectButton'
import EditProjectForm from '../components/EditProjectForm'

const Project = () => {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_PROJECT, {
    variables: { id }
  })

  if(loading) return <Spinner />
  if(error) return <p>Something went wrong</p>

  return (
    <>
      {!loading && !error && (
        <div className='mx-auto md:w-[75%] border-2 p-10 my-10'>
          <div  className='flex justify-end'>
            <Link to='/' className='hover:bg-slate-100 p-2 text-sm bg-slate-200 rounded-md'>Back</Link>
          </div>
          <h1 className='text-4xl text-slate-800'>{data.project.name}</h1>
          <p className='text-sm text-slate-800'>{data.project.description}</p>

          <p className='mt-10'>Project Status</p>
          <p className='text-slate-500 text-sm'>{data.project.status}</p>

          <ClientInfo client={data.project.client} />

          <EditProjectForm project={data.project} />

          <DeleteProjectButton id={id} />
        </div>
      )}
    </>
  )
}

export default Project