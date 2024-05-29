import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { AuthContext } from '../../contexts/AuthContext';
const Register = () => {
    const [user, setUser] = useState({ email: '', fullName: '', username: '', password: '' })
    const [msg, setMsg] = useState('')
    const [err, setErr] = useState('')
    const [visible, setVisible] = useState(false)
    const { register } = useContext(AuthContext)

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await register(user)
            setMsg(res.data.message)
        } catch (error) {
            setErr(error.response.data.message)
        }
    }
    return (
        <div className='flex  justify-center '>
            <div className='border w-1/3 m-5 rounded-3xl'>
                <div className='flex justify-center'>
                    <img src="https://static.vecteezy.com/system/resources/thumbnails/010/260/479/small/default-avatar-profile-icon-of-social-media-user-in-clipart-style-vector.jpg" alt="" className=' w-28 h-28 rounded-full' />
                </div>
                <h1 className='text-center text-2xl font-bold mb-2'>Create a new account</h1>
                <div className=' flex justify-center'>
                    {
                        msg ? <p className='text-center font-semibold text-green-700 px-10'>{msg}</p> : <p className='text-center font-semibold text-red-700 px-10'>{err}</p>
                    }
                </div>
                <div className='mx-10'>
                    <hr className='' />
                    <div className='my-3'>
                        <p className='font-semibold'>Email</p>
                        <input type="email" placeholder='Email' name='email' value={user.email} onChange={handleChange} className='border outline-none p-1 px-2 rounded-lg w-full my-1' />
                    </div>
                    <div className='my-3'>
                        <p className='font-semibold'>Full Name</p>
                        <input type="text" placeholder='FullName' name='fullName' value={user.fullName} onChange={handleChange} className='border outline-none p-1 px-2 rounded-lg w-full my-1' />
                    </div>
                    <div className='my-3'>
                        <p className='font-semibold'>Username</p>
                        <input type="text" placeholder='Username' name='username' value={user.username} onChange={handleChange} className='border outline-none p-1 px-2 rounded-lg w-full my-1' />
                    </div>
                    <div className='my-3'>
                        <p className='font-semibold'>Password</p>
                        {
                            <div className='flex border rounded-lg px-2'>
                                <input type={visible ? 'text' : 'password'} placeholder='Password' name='password' value={user.password} onChange={handleChange} className='outline-none  rounded-lg w-full my-1' />
                                {

                                    visible
                                        ?
                                        <button onClick={() => setVisible(false)}><VisibilityOffIcon /></button>
                                        :
                                        <button onClick={() => setVisible(true)}><RemoveRedEyeIcon /></button>

                                }
                            </div>
                        }
                    </div>
                    <div className='my-3'>
                        <div className='m-5 flex justify-center'>
                            <button className='w-full py-2 text-white bg-blue-500 rounded-lg text-md' onClick={handleSubmit}>Sign up</button>
                        </div>
                    </div>
                    <div className='m-5 flex justify-center'>
                        <p className=''>Have an account? <span className='text-blue-600'><Link to='/login'>Log in</Link></span></p>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Register