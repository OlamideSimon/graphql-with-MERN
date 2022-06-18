import { FaTrash } from 'react-icons/fa'
import { useMutation } from '@apollo/client'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { DELETE_PROJECT } from '../mutations/projectMutations'
import { GET_PROJECTS } from '../queries/projectQueries'

const DeleteProjectButton = ({ id }) => {
    const navigate = useNavigate()
    const [ deleteProject ] = useMutation(DELETE_PROJECT, {
        variables: { id },
        refetchQueries: [{ query: GET_PROJECTS }],
        onCompleted: () => navigate('/')
    })

    const handleDelete = () => {
        deleteProject(id)
    }

    return (
        <div className='flex justify-end p-5'>
            <button className='hover:bg-red-700 p-3 text-sm bg-red-500 rounded-md text-white' onClick={handleDelete}>
                <div className='flex items-center space-x-2'>
                    <FaTrash size='20px' />
                    <p>Delete Project</p>
                </div>
            </button>
        </div>
    )
}

export default DeleteProjectButton