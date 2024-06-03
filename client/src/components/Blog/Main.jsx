import React, { useContext, useEffect, useState } from 'react'
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { BlogContext } from '../../contexts/BlogContext';
import { Link } from 'react-router-dom'
import { UserContext } from '../../contexts/UserContext';
const Main = () => {
    const [bookmark, setBookmark] = useState(false)
    const [blogs, setBlogs] = useState([])
    const { getAllBlog } = useContext(BlogContext)
    const { getProfileById } = useContext(UserContext)

    const handleBookmark = () => {
        setBookmark(!bookmark)
    }
    const handleBlogs = async () => {
        try {
            const res = await getAllBlog()
            console.log(res.data.blogs)
            // const userId = res.data.blog.author._id
            // const res1 = await getProfileById(userId)
            // setProfile(res1)
            setBlogs(res.data.blogs)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        handleBlogs()
    }, []);

    return (

        <div>
            {
                blogs.map((blog) => (
                    <div className='border flex items-center rounded-xl mx-10 my-5' key={blog._id}>
                        <div className=''>
                            <div className='flex justify-start items-center mx-3 my-3'>
                                <div className='mx-2'>
                                    <img className='w-10 h-10 rounded-full' src="https://static.vecteezy.com/system/resources/thumbnails/010/260/479/small/default-avatar-profile-icon-of-social-media-user-in-clipart-style-vector.jpg" alt="" />
                                </div>
                                <div className='flex mx-2'>
                                    {/* <h1 className='font-semibold text-lg'>{blog.author.username} <span className='font-normal'>{blog.createdAt.slice(0, 10).split('-').reverse().join('-')}</span></h1> */}
                                </div>
                            </div>
                            <div className='mx-5 my-3'>
                                <div className='p-1'>
                                    <h1 className='font-bold text-2xl py-1'>{blog.title}</h1>
                                    <p className='  py-1'>{blog.content.slice(0, 250)}...  <span className='text-blue-600 hover:cursor-pointer'><Link to={`/profile/readBlog/${blog._id}`}>read more</Link></span></p>
                                </div>
                                <div className='flex justify-between p-1'>
                                    <p className='bg-neutral-300 px-5 rounded-2xl'>Psycology</p>
                                    <button onClick={handleBookmark}>{bookmark ? <BookmarkIcon /> : <BookmarkBorderIcon />}</button>
                                </div>
                            </div>
                        </div>
                        <div className='w-2/4 flex justify-center'>
                            <img src={blog.image} className='w-28 h-28' alt="" />
                        </div>
                    </div>
                ))
            }
        </div >

    )
}

export default Main
