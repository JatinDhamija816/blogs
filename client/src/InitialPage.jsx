import React from 'react'
import { Link } from 'react-router-dom'

const InitialPage = () => {
    return (
        <div className='bg-amber-400 min-h-screen'>
            <div className='flex justify-between'>
                <div>
                    <h1 className='px-5 py-5 font-semibold text-3xl uppercase'>Blog</h1>
                </div>
                <div className='flex'>
                    <p className='px-5 py-5 font-semibold text-lg'><Link to='/login'>Login</Link></p>
                    <p className='px-5 py-5 font-semibold text-lg'><Link to='register'>Register</Link></p>
                </div>
            </div>
            <hr className="border-t-2 border-black" />
            <div className=''>
                <h1 className='text-8xl m-10 text-center'>Stay curious.</h1>
                <p className='text-2xl m-10 text-center'>Discover stories, thinking, and expertise from writers on any topic.</p>
            </div>
        </div>
    )
}

export default InitialPage