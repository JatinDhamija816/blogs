import React from 'react'
import LeftSideBar from './LeftSideBar'
import Main from './Main'
const Home = () => {
    return (
        <div>
            <div className='flex'>
                <div className='w-1/5 h-fit m-3 drop-shadow-xl rounded-xl bg-gray-200'>
                    <LeftSideBar />
                </div>
                <div className='w-4/5 h-fit m-3'>
                    <Main />
                </div>
            </div>
        </div>
    )
}

export default Home
