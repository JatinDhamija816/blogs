import React, { useContext, useState } from 'react'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { UserContext } from '../../contexts/UserContext';

const ChangePassword = () => {
    const [user, setUser] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' })
    const [err, setErr] = useState('')
    const [visible, setVisible] = useState(false)
    const { changePassword } = useContext(UserContext)

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await changePassword(user)
            alert(res.data.message)
            window.history.back();
        } catch (error) {
            setErr(error.response.data.message)
        }
    }
    return (
        <div>
            <div className='flex justify-center mt-10'>
                <div className='mx-10 w-1/3 border rounded-xl px-10'>
                    <h1 className='text-center text-2xl font-bold m-5'>Change Password</h1>
                    <div className=' flex justify-center'>
                        {
                            err && <p className='text-center font-semibold text-red-700 px-10'>{err}</p>
                        }
                    </div>
                    <hr className='' />
                    <div className='my-5'>
                        <p className='font-semibold'>Current Password</p>
                        <div className='flex border rounded-lg px-2'>
                            <input type={visible ? 'text' : 'password'} placeholder='Current Password' name='currentPassword' value={user.currentPassword} onChange={handleChange} className='outline-none  rounded-lg w-full my-1' />
                            {
                                visible ?
                                    <button onClick={() => setVisible(false)}><VisibilityOffIcon /></button>
                                    :
                                    <button onClick={() => setVisible(true)}><RemoveRedEyeIcon /></button>
                            }
                        </div>
                    </div>
                    <div className='my-5'>
                        <p className='font-semibold'>New Password</p>
                        <div className='flex border rounded-lg px-2'>
                            <input type={visible ? 'text' : 'password'} placeholder='New Password' name='newPassword' value={user.newPassword} onChange={handleChange} className='outline-none  rounded-lg w-full my-1' />
                            {
                                visible ?
                                    <button onClick={() => setVisible(false)}><VisibilityOffIcon /></button>
                                    :
                                    <button onClick={() => setVisible(true)}><RemoveRedEyeIcon /></button>
                            }
                        </div>
                    </div>
                    <div className='my-5'>
                        <p className='font-semibold'>Confirm Password</p>
                        <div className='flex border rounded-lg px-2'>
                            <input type={visible ? 'text' : 'password'} placeholder='Confirm Password' name='confirmPassword' value={user.confirmPassword} onChange={handleChange} className='outline-none  rounded-lg w-full my-1' />
                            {
                                visible ?
                                    <button onClick={() => setVisible(false)}><VisibilityOffIcon /></button>
                                    :
                                    <button onClick={() => setVisible(true)}><RemoveRedEyeIcon /></button>
                            }
                        </div>
                    </div>
                    <div className='my-5'>
                        <div className='m-5 flex justify-center'>
                            <button className='w-full py-2 text-white bg-blue-500 rounded-lg text-md' onClick={handleSubmit}>Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChangePassword