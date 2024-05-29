import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../contexts/UserContext'

const DeviceInfo = () => {
    const { deviceInfo } = useContext(UserContext)
    const [users, setUsers] = useState([])
    const handleClick = async () => {
        try {
            const res = await deviceInfo()
            setUsers(res)
        } catch (error) {
            console.error(error)
        }
    }
    useEffect(() => {
        handleClick()
    }, [])
    return (
        <div className='flex flex-wrap justify-center'>
            {
                users.map((user) => {
                    return <div div className='bg-zinc-600 max-w-fit p-3 rounded-xl drop-shadow-2xl text-white m-5' key={user._id} >
                        <div className='flex py-2'>
                            <h1 className='px-2'>Device Type: </h1>
                            <p className='px-2'>{user.deviceType}</p>
                        </div>
                        <div className='flex py-2'>
                            <h1 className='px-2'>Login Time:</h1>
                            <p className='px-2'>{user.time}</p>
                        </div>
                    </div>
                })
            }
        </div >
    )
}

export default DeviceInfo
