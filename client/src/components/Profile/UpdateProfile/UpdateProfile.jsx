import React from 'react'
import UpdateProfileData from './UpdateProfileData'
import UpdateProfilePic from './UpdateProfilePic'

const UpdateProfile = () => {
    return (
        <div className='flex'>
            <div className='w-1/2'>
                <UpdateProfileData />
            </div>
            <div className='w-1/2'>
                <UpdateProfilePic />
            </div>
        </div>
    )
}

export default UpdateProfile
