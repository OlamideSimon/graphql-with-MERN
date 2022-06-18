import { useMutation } from '@apollo/client';
import React, { useState } from 'react'
import { UPDATE_PROJECT } from '../mutations/projectMutations';
import { GET_PROJECT } from '../queries/projectQueries';

const EditProjectForm = ({ project }) => {
    const [formData, setFormData] = useState({
        name: project.name,
        description: project.description,
        status: ''
    })
    const { name, description, status } = formData;
    const [ updateProject ] = useMutation(UPDATE_PROJECT, {
        variables: { id: project.id, name, description, status },
        refetchQueries: [{ query: GET_PROJECT, variables: { id: project.id } }]
    })

    const onChange = e => {
        setFormData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value
        }))
    }

    const onSubmit = (e) => {
        e.preventDefault()  

        if(name === '' || description === '' || status === '') {
            return alert('Please Fill in all fields');
        }

        updateProject(name, description, status);
        setFormData({
            name: project.name,
            description: project.description,
            status: ''
        })
    }

  return (
    <div className='mt-10 space-y-5'>
        <p className='text-2xl text-slate-800'>Edit Project Details</p>
        <form className='flex flex-col space-y-2' onSubmit={onSubmit}>
            <label className='text-sm text-slate-800'>Name</label>
            <input className='w-full p-2 border-2 border-slate-200 rounded-md' type='text' name='name' value={name} onChange={onChange} />
            <label className='text-sm text-slate-800'>Description</label>
            <textarea className='w-full p-2 border-2 border-slate-200 rounded-md' name='description' value={description} onChange={onChange} />
            <label className='text-sm text-slate-800'>Status</label>
            <select className='w-full p-2 border-2 border-slate-200 rounded-md' name='status' value={status} onChange={onChange}>
                <option value=''></option>
                <option value='new'>New</option>
                <option value='progress'>In Progress</option>
                <option value='completed'>Completed</option>
            </select>
            <button className='hover:bg-slate-100 p-2 text-sm bg-slate-200 rounded-md text-black' type='submit'>Update Project</button>
        </form>
    </div>
  )
}

export default EditProjectForm