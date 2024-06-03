import React, { useContext, useEffect, useState } from 'react'
import { BlogContext } from '../../contexts/BlogContext'
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import { useParams } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';
const ReadBlog = () => {
    const [blog, setBlog] = useState({})
    const [profile, setProfile] = useState({})

    const [bookmark, setBookmark] = useState(false)
    const { getBlogById } = useContext(BlogContext)
    const { getProfileById } = useContext(UserContext)

    const id = useParams().id
    const getBlog = async () => {
        const res = await getBlogById(id)
        const userId = res.data.blog.author._id
        const res1 = await getProfileById(userId)
        setProfile(res1)
        setBlog(res.data.blog)
    }
    const handleBookmark = () => {
        setBookmark(!bookmark)
    }
    useEffect(() => {
        getBlog()
    }, [])


    return (
        <div>
            {
                <div className=' w-3/5 p-5 mx-auto'>
                    <div>
                        <h1 className='font-bold text-5xl mb-3'>{blog.title}</h1>
                    </div>
                    <div className='flex justify-start items-center'>
                        <div className=''>
                            <img className='w-12 h-12 rounded-full' src={profile.profilePic} alt="" />
                        </div>
                        <div className=''>
                            <h1 className='font-semibold text-xl mx-2'>{profile.username} </h1>
                        </div>
                    </div>
                    <hr className=" my-5" />
                    <div className=' mx-auto mb-5'>
                        <img className='mx-auto w-fit h-72' src={blog.image} alt="" />
                    </div>
                    <div className='m-5'>
                        <p className='text-xl tracking-widest'>{blog.content}</p>
                    </div>
                </div>
            }
        </div>
    )
}

export default ReadBlog
