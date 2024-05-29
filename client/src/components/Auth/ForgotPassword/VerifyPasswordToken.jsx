import { useContext, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { AuthContext } from '../../../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
const VerifyPasswordToken = () => {
    const navigate = useNavigate()
    const [verify, setVerify] = useState(false)
    const { token } = useParams()
    const { verifyPasswordToken } = useContext(AuthContext)

    const handleVerifyEmail = async () => {
        try {
            await verifyPasswordToken(token)
            setVerify(true)
            alert('Email Verified successfully')
            setTimeout(() => {
                navigate('/forgotPassword')
            }, 5000)
        } catch (error) {
            alert('Verification Failed')
        }
    }

    return (
        <div className='flex justify-center align-middle items-center min-h-screen'>
            {
                verify
                    ?
                    <div>
                        <p className='text-center'>Account Verified</p>
                        <p className='text-blue-600 text-center' > <Link to='/forgotPassword'>Click here for Change Password</Link></p>
                    </div>
                    :
                    <button onClick={handleVerifyEmail}>Click here for Verify</button>
            }
        </div>
    )
}
export default VerifyPasswordToken