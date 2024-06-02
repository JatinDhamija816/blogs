import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../contexts/AuthContext'
import { UserContext } from '../../contexts/UserContext'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const Navbar = () => {
    const [profile, setProfile] = useState({})
    const navigate = useNavigate()
    const { logout } = useContext(AuthContext)
    const { getProfile } = useContext(UserContext)
    const token = document.cookie.split('=')[1]

    const handleLogout = async () => {
        try {
            await logout()
            navigate('/login')
        } catch (error) {
            console.log(error)
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
    }, []);
    return (
        <div >
            <div className='flex justify-between'>
                <div className='px-5 py-3'>
                    <h1 className=' font-semibold text-2xl uppercase'><Link to='/home'>Blog</Link></h1>
                </div>
                <div className='flex px-5 py-3 justify-center items-center'>
                    <div className='text-lg hover:cursor-pointer mx-2'>
                        <Link to='createBlog'><p className=''><AddCircleOutlineIcon /><span className='px-1 font-medium'>Write</span></p></Link>
                    </div>
                    <div>
                        <Link to='/profile'>
                            <img src={profile.profilePic} alt="" className='w-10 h-10 mx-2 rounded-full' />
                        </Link>
                    </div>
                    <div>
                        <button className='mx-2' onClick={handleLogout}>Logout</button>
                    </div>
                </div>
            </div>
            <hr className="border-t-2 border-black" />
        </div>
    )
}
export default Navbar