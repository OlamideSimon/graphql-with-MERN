import { useState } from 'react'
import { FaUser } from 'react-icons/fa'
import { useMutation, useQuery } from '@apollo/client'
import { ADD_PROJECT } from '../mutations/projectMutations'
import { GET_PROJECTS } from '../queries/projectQueries'
import { GET_CLIENTS } from '../queries/clientQueries'

const AddProjectModal = () => {
    const [ showModal, setShowModal ] = useState(false)
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        clientId:  '',
        status: 'new'
    })
    const { name, description, clientId, status } = formData;

    // Get clieent for select
    const { loading, error, data } = useQuery(GET_CLIENTS)

    const [ addProject ] = useMutation(ADD_PROJECT, {
        variables: { name, description, clientId, status },
        update(cache, { data: { addProject } }) {
            const { projects } = cache.readQuery({ query: GET_PROJECTS })
            cache.writeQuery({
                query: GET_PROJECTS,
                data: { projects: [...projects, addProject] }
            })
        }
    })

    const onChange = e => {
        setFormData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value
        }))
    }

    const onSubmit = (e) => {
        setShowModal(false)
        e.preventDefault()

        if(name === '' || description === '' || status === '') {
            return alert('Please Fill in all fields');
        }

        addProject(name, description, status, clientId);

        setFormData({
            name: '',
            description: '',
            clientId:  '',
            status: 'new'
        })
    }

    if(loading) return null;
    if(error) return 'Something went wrong';

    return (
        <>
            {!loading && !error && (
                <>
                    <button
                        className="bg-pink-500 text-right text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => setShowModal(true)}
                    >
                        Add Project
                    </button>

                    
                    {showModal ? (
                        <>
                            <div
                                className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                            >
                                <div className="relative w-auto my-6 mx-auto max-w-3xl">
                                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                        <div className=" p-5 border-b border-solid border-slate-200 rounded-t">
                                            <div className='flex justify-center items-center'>
                                                <FaUser className='mr-5' />
                                                <p>New Project</p>
                                            </div>
                                        </div>
                                        <form onSubmit={onSubmit}>
                                            <div className="relative p-6 flex-auto space-y-5">
                                                <div className='block'>
                                                    <label className='text-slate-500' htmlFor='name'>Name</label>
                                                    <div className='bg-slate-200 rounded-lg p-1'>
                                                        <input type='text' id='name' className='bg-transparent w-full focus:outline-none' name='name' value={name} onChange={onChange} />
                                                    </div>
                                                </div>
                                                <div className='block'>
                                                    <label className='text-slate-500' htmlFor='description'>Description</label>
                                                    <div className='bg-slate-200 rounded-lg p-1'>
                                                        <textarea id='description' className='bg-transparent w-full focus:outline-none' name='description' value={description} onChange={onChange}></textarea>
                                                    </div>
                                                </div>
                                                <div className='block'>
                                                    <label className='text-slate-500' htmlFor='status'>Status</label>
                                                    <div className='bg-slate-200 rounded-lg p-1'>
                                                        <select name='status' id='status' value={status} onChange={onChange} className='bg-transparent w-full focus:outline-none'>
                                                            <option value='new'>New</option>
                                                            <option value='progress'>In Progress</option>
                                                            <option value='completed'>Completed</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className='block'>
                                                    <label className='text-slate-500' htmlFor='status'>Client</label>
                                                    <div className='bg-slate-200 rounded-lg p-1'>
                                                        <select name='clientId' id='clientId' value={clientId} onChange={onChange} className='bg-transparent w-full focus:outline-none'>
                                                            <option value=''>Select a Client</option>
                                                            {data.clients.map(client => (
                                                                <option key={client.id} value={client.id}>{client.name}</option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                                                <button
                                                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                    type="button"
                                                    onClick={() => setShowModal(false)}
                                                >
                                                    Dismiss
                                                </button>
                                                <button
                                                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                    type="submit"
                                                >
                                                    Add Client
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                            <div className="opacity-30 fixed inset-0 z-40 bg-black"></div>
                        </>
                    ) : null}
                </>
            )}
        </>
    )
}

export default AddProjectModal