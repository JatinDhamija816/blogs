import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../../contexts/UserContext'

const UpdateProfileData = () => {
    const [user, setUser] = useState({ email: null, fullName: null, username: null })

    const [err, setErr] = useState('')
    const [profile, setProfile] = useState({})

    const { getProfile, updateProfileData } = useContext(UserContext)
    const token = document.cookie.split('=')[1]

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    const handleUpdate = async (e) => {
        e.preventDefault()
        try {
            console.log('Enter in UpdateProfileData')
            await updateProfileData(user, token)
            window.history.back();
        } catch (error) {
            console.error(error)
            setErr(error.response)
        }
    }

    const handleProfile = async () => {
        try {
            const res = await getProfile(token)
            setProfile(res)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        handleProfile()
    }, [])
    return (
        <div>
            <div className='w-3/6 mx-auto'>
                {
                    console.log('Enter in updateProfileData')
                }
                <div>
                    <h1 className='text-center text-2xl font-bold my-5'>Update Profile</h1>
                </div>
                <div className=' flex justify-center'>
                    {
                        err && <p className='text-center font-semibold text-red-700 px-10'>{err}</p>
                    }
                </div>
                <hr className='' />
                <div className='my-3'>
                    <p className='font-semibold'>Email</p>
                    <input type="email" placeholder={profile.email} name='email' value={user.email} onChange={handleChange} className='border outline-none p-1 px-2 rounded-lg w-full my-1' />
                </div>
                <div className='my-3'>
                    <p className='font-semibold'>Username</p>
                    <input type="text" placeholder={profile.username} name='username' value={user.username} onChange={handleChange} className='border outline-none p-1 px-2 rounded-lg w-full my-1' />
                </div>
                <div className='my-3'>
                    <p className='font-semibold'>Full Name</p>
                    <input type="text" placeholder={profile.fullName} name='fullName' value={user.fullName} onChange={handleChange} className='border outline-none p-1 px-2 rounded-lg w-full my-1' />
                </div>
                <div className='my-3'>
                    <div className='m-5 flex justify-center'>
                        <button className='w-full py-2 text-white bg-blue-500 rounded-lg text-md' onClick={handleUpdate}>Update</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default UpdateProfileData