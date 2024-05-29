import { useContext, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { AuthContext } from '../../contexts/AuthContext'

const VerifyEmail = () => {
    const [verify, setVerify] = useState(false)
    const { token } = useParams()
    const { verifyEmail } = useContext(AuthContext)

    const handleVerifyEmail = async () => {
        try {
            await verifyEmail(token)
            setVerify(true)
            alert('Email Verified successfully')
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
                        <p className='text-blue-600 text-center' > <Link to='/login'>Click here for Log in</Link></p>
                    </div>
                    :
                    <button onClick={handleVerifyEmail}>Click here for Verify</button>
            }
        </div>
    )
}
export default VerifyEmail