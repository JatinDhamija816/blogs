import React from 'react'
import UpdateProfileData from './UpdateProfileData'
import UpdatePic from './UpdatePic'

const UpdateProfile = () => {
    return (
        <div className='flex'>
            <div className='w-1/2'>
                <UpdateProfileData />
            </div>
            <div className='w-1/2'>
                <UpdatePic />
            </div>
        </div>
    )
}

export default UpdateProfile
