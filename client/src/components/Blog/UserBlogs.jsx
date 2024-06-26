import React, { useContext, useEffect, useState } from 'react'
import { BlogContext } from '../../contexts/BlogContext';
import { Link } from 'react-router-dom';

const UserBlogs = () => {
    const [blogs, setBlogs] = useState([])
    const { getBlogByUser, DeleteBlog } = useContext(BlogContext)
    const handleBlogs = async () => {
        try {
            const token = document.cookie.split('=')[1]
            const res = await getBlogByUser(token)
            setBlogs(res.data.blog)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        handleBlogs()
    }, []);
    return (
        <div className='flex flex-wrap justify-center'>
            {
                blogs.map((blog) => (
                    <div key={blog._id} className='flex justify-center'>
                        <div className='border flex items-center rounded-xl mx-10 my-5 w-2/3' >
                            <div className=''>
                                <div className='flex justify-start items-center mx-3 my-3'>
                                    {/* <div className='m-2'>
                                    <img className='w-10 h-10 rounded-full' src="https://static.vecteezy.com/system/resources/thumbnails/010/260/479/small/default-avatar-profile-icon-of-social-media-user-in-clipart-style-vector.jpg" alt="" />
                                </div> */}
                                    <div className='flex m-2'>
                                        <h1 className='font-semibold text-lg'>{blog.author.username} <span className='font-normal'>{blog.createdAt.slice(0, 10).split('-').reverse().join('-')}</span></h1>
                                    </div>
                                </div>
                                <div className='mx-5 my-3'>
                                    <div className='p-1'>
                                        <h1 className='font-bold text-2xl py-1'>{blog.title}</h1>
                                        <p className='  py-1'>{blog.content.slice(0, 250)}... <span className='text-blue-600 hover:cursor-pointer'><Link to={`/profile/readBlog/${blog._id}`}>read more</Link></span></p>
                                    </div>
                                </div>
                            </div>
                            <div className='w-2/4 flex justify-center'>
                                <img src="https://images.unsplash.com/photo-1716222350384-763cc1ec344a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxMHx8fGVufDB8fHx8fA%3D%3D" className='w-28 h-28' alt="" />
                            </div>
                        </div>
                        <div>
                            <div className='m-1 pt-4  flex justify-center'>
                                <button className='w-20 py-1 bg-yellow-400 rounded-lg text-md' ><Link to={`/profile/updateBlog/${blog._id}`}>Edit</Link ></button>
                            </div>
                            <div className='m-1 pt-4  flex justify-center '>
                                <button className='w-20 py-1 bg-red-600 text-white rounded-lg text-md'
                                    onClick={
                                        async () => {
                                            try {
                                                await DeleteBlog(blog._id)
                                                alert('Blog Deleted')
                                                window.location.reload()
                                            } catch (error) {
                                                console.error(error)
                                            }
                                        }}
                                >
                                    Delete</button>
                            </div>
                        </div>
                    </div>
                ))
            }
        </div >
    )
}

export default UserBlogs
