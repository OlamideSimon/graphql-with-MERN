import { useState } from 'react'
import { FaUser } from 'react-icons/fa'
import { useMutation } from '@apollo/client'
import { ADD_CLIENT } from '../mutations/clientMutations'
import { GET_CLIENTS } from '../queries/clientQueries'

const AddClientModal = () => {
    const [ showModal, setShowModal ] = useState(false)
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: ''
    })
    const { email, name, phone } = formData;

    const [ addClient ] = useMutation(ADD_CLIENT, {
        variables: { name, email, phone },
        update(cache, { data: { addClient } }) {
            const { clients } = cache.readQuery({ query: GET_CLIENTS })
            cache.writeQuery({
                query: GET_CLIENTS,
                data: { clients: [...clients, addClient] }
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

        if(name === '' || email === '' || phone === '') {
            return alert('Please Fill in all fields');
        }

        addClient(name, email, phone);

        setFormData({
            email: '',
            name: '',
            phone: ''
        })
    }

    return (
        <>
            <button
                className="bg-pink-500 text-right text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => setShowModal(true)}
            >
                Add Client
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
                                        <p>Add Client</p>
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
                                            <label className='text-slate-500' htmlFor='email'>Email</label>
                                            <div className='bg-slate-200 rounded-lg p-1'>
                                                <input type='email' id='email' className='bg-transparent w-full focus:outline-none' name='email' value={email} onChange={onChange} />
                                            </div>
                                        </div>
                                        <div className='block'>
                                            <label className='text-slate-500' htmlFor='phone'>Phone</label>
                                            <div className='bg-slate-200 rounded-lg p-1'>
                                                <input type='number' id='phone' className='bg-transparent w-full focus:outline-none' name='phone' value={phone} onChange={onChange} />
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
    )
}

export default AddClientModal