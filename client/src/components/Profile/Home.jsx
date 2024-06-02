import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
    return (
        <div>
            <div className='flex justify-center'>
                <p className='border w-1/5 rounded-lg py-3 m-5 drop-shadow-2xl text-center bg-gray-500 text-white text-xl font-semibold'><Link to='/profile/userProfile'>UserProfile</Link></p>
                <p className='border w-1/5 rounded-lg py-3 m-5 drop-shadow-2xl text-center bg-gray-500 text-white text-xl font-semibold'><Link to='/profile/deviceInfo'>Device Info</Link></p>
                <p className='border w-1/5 rounded-lg py-3 m-5 drop-shadow-2xl text-center bg-gray-500 text-white text-xl font-semibold'><Link to='/profile/changePassword'>ChangePassword</Link></p>
                <p className='border w-1/5 rounded-lg py-3 m-5 drop-shadow-2xl text-center bg-gray-500 text-white text-xl font-semibold'><Link to='/profile/userBlogs'>Your Stories</Link></p>
            </div>
        </div >
    )
}
export default Home