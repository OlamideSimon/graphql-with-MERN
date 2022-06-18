import React from 'react'
import { Link } from 'react-router-dom'

const ProjectCard = ({ project }) => {
  return (
    <div className='border-2 shadow-md p-3'>
        <div className="mb-3 space-x-1">
            <div className='flex justify-between items-center'>
                <p className='font-medium'>{project.name}</p>

                <Link to={`projects/${project.id}`} className='hover:bg-slate-100 p-2 text-sm bg-slate-200 rounded-md'>View</Link>
            </div>
            <p className='text-xs text-slate-800'>Status: <strong>{project.status}</strong></p>
        </div>
    </div>
  )
}

export default ProjectCard