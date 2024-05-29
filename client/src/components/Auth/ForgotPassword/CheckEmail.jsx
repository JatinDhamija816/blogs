import React, { useState } from 'react'
import { useContext } from 'react'
import { AuthContext } from '../../../contexts/AuthContext'

const CheckEmail = () => {
    const [email, setEmail] = useState('')
    const [msg, setMsg] = useState('')
    const [err, setErr] = useState('')
    const { checkEmail } = useContext(AuthContext)

    const handleSubmit = async () => {
        try {
            const res = await checkEmail(email)
            setMsg(res.data.message)
        } catch (error) {
            setErr(error.response.data.message)
        }
    }

    return (
        <div className='flex justify-center mt-10'>
            <div className='mx-10 w-1/3 border rounded-xl px-10'>
                <h1 className='text-center text-2xl font-bold m-5'>Enter Email</h1>
                <div className=' flex justify-center'>
                    {
                        msg ? <p className='text-center font-semibold text-green-700 px-10'>{msg}</p> : <p className='text-center font-semibold text-red-700 px-10'>{err}</p>
                    }
                </div>
                <hr className='' />
                <div className='my-5'>
                    <p className='font-semibold'>Email</p>
                    <div className='flex border rounded-lg px-2'>
                        <input type='text' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} className='outline-none  rounded-lg w-full my-1' />
                    </div>
                </div>
                <div className='my-5'>
                    <div className='m-5 flex justify-center'>
                        <button className='w-full py-2 text-white bg-blue-500 rounded-lg text-md' onClick={handleSubmit}>Submit</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CheckEmail