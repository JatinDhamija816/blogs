import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../../contexts/UserContext'

const UserProfile = () => {
    const [profile, setProfile] = useState({})
    const { getProfile } = useContext(UserContext)
    const token = document.cookie.split('=')[1]

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
    }, []);
    return (
        <div>
            <div className='w-1/2 mx-auto'>
                {
                    <div className='flex flex-wrap justify-center mt-5'>
                        <div className='border rounded-full'>
                            <img className='w-28 h-28 rounded-full' src={profile.profilePic} alt="" />
                        </div>
                        <div className='drop-shadow-2xl flex w-5/6 border mx-10 my-5 justify-between px-5 py-3 bg-gray-400 text-white text-lg rounded-lg'>
                            <h1>Email</h1>
                            <p>{profile.email}</p>
                        </div>
                        <div className='drop-shadow-2xl flex w-5/6 border mx-10 my-5 justify-between px-5 py-3 bg-gray-400 text-white text-lg rounded-lg'>
                            <h1>Username</h1>
                            <p>{profile.username}</p>
                        </div>
                        <div className='drop-shadow-2xl flex w-5/6 border mx-10 my-5 justify-between px-5 py-3 bg-gray-400 text-white text-lg rounded-lg'>
                            <h1>FullName</h1>
                            <p>{profile.fullName}</p>
                        </div>
                    </div>
                }
                <div className='flex justify-center'>
                    <button className='border bg-emerald-600 px-10 py-2 rounded-xl mx-5 my-3 text-white text-lg'>
                        <Link to='/profile/updateProfile'>Update Profile</Link>
                    </button>
                    <button className='border bg-red-600 px-10 py-2 rounded-xl mx-5 my-3 text-white text-lg'>
                        <Link to='/profile/changePassword'>Change Password</Link>
                    </button>
                </div>
            </div>
        </div>
    )
}
export default UserProfile