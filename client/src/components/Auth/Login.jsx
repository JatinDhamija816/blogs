import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { AuthContext } from '../../contexts/AuthContext';

const Login = () => {
    const [user, setUser] = useState({ email: '', password: '' })
    const navigate = useNavigate()
    const [err, setErr] = useState('')
    const [visible, setVisible] = useState(false)
    const { login } = useContext(AuthContext)

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await login(user)
            navigate('/home')
        } catch (error) {
            console.log(error)
            setErr(error.response.data.message)
        }
    }
    return (
        <div className='min-h-screen flex justify-center content-center mx-10'>
            <div className='h-screen mx-10 w-1/2 content-center'>
                <img src="https://images.pexels.com/photos/7150986/pexels-photo-7150986.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" className='h-5/6 w-3/5 rounded-3xl' />
            </div>
            <div className='m-10 rounded-3xl content-center'>
                <h1 className='text-center text-2xl font-bold m-5'>Welcome back</h1>
                <div className=' flex justify-center'>
                    {
                        err && <p className='text-center font-semibold text-red-700 px-10'>{err}</p>
                    }
                </div>
                <div className='mx-10'>
                    <hr className='' />
                    <div className='my-3 mt-5'>
                        <p className='font-semibold'>Email or Username</p>
                        <input type="email" placeholder='Email or Username' name='email' value={user.email} onChange={handleChange} className='border outline-none p-1 px-2 rounded-lg w-full my-1' />
                    </div>
                    <div className='my-3'>
                        <p className='font-semibold'>Password</p>
                        <div className='flex border rounded-lg px-2'>
                            <input type={visible ? 'text' : 'password'} placeholder='Password' name='password' value={user.password} onChange={handleChange} className='outline-none  rounded-lg w-full my-1' />
                            {
                                visible ?
                                    <button onClick={() => setVisible(false)}><VisibilityOffIcon /></button>
                                    :
                                    <button onClick={() => setVisible(true)}><RemoveRedEyeIcon /></button>
                            }
                        </div>
                    </div>
                    <div className='my-3'>
                        <div className='m-5 flex justify-center'>
                            <button className='w-full py-2 text-white bg-blue-500 rounded-lg text-md' onClick={handleSubmit}>Log in</button>
                        </div>
                    </div>
                    <div className='m-5 flex justify-center'>
                        <p className='text-blue-600'><Link to='/checkEmail'>Forgotten Password?</Link></p>
                    </div>
                    <div className='m-5 flex justify-center'>
                        <p className=''>Don't have an account? <span className='text-blue-600'><Link to='/register'>Sign up</Link></span></p>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Login