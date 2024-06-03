import React, { useContext, useEffect, useState } from 'react'
import { BlogContext } from '../../contexts/BlogContext'
import { useParams } from 'react-router-dom'
const UpdateBlog = () => {
    const [blogData, setBlogData] = useState({ title: '', content: '' })
    const [blog, setBlog] = useState({})
    const [msg, setMsg] = useState('')
    const [err, setErr] = useState('')
    const handleChange = (e) => {
        setBlogData({ ...blogData, [e.target.name]: e.target.value })
    }
    const { UpdateBlogById, getBlogById } = useContext(BlogContext)
    const id = useParams().id
    const handleUpdate = async (e) => {
        e.preventDefault()
        try {
            const res = await UpdateBlogById(blogData, id)
            setMsg(res.data.message)
        } catch (error) {
            console.error('Error in Update Blog File', error)
            setErr(error.response.data.message)
        }
    }
    const getBlog = async () => {
        const res = await getBlogById(id)
        setBlog(res.data.blog)
    }
    useEffect(() => {
        getBlog()
    }, [])
    return (
        <div className=''>
            <div className='w-2/4 mx-auto'>
                <div className=' flex justify-center'>
                    {
                        msg ? <p className='text-center font-semibold text-green-700 px-10'>{msg}</p> : <p className='text-center font-semibold text-red-700 px-10'>{err}</p>
                    }
                </div>
                <div className='border-b-2 m-3 p-2 text-3xl'>
                    <input className='outline-none' type="text" placeholder={blog.title} onChange={handleChange} value={blogData.title} name='title' />
                </div>
                <div className='border-b-2 m-3 p-2 text-xl'>
                    <textarea className='outline-none' rows={10} cols={65} type="text" placeholder={blog.content} onChange={handleChange} value={blogData.content} name='content' />
                </div>
                <div className='m-3 p-2'>
                    <input className='outline-none' type="file" />
                </div>
                <div className='m-3 p-2 flex justify-center'>
                    <button className='w-1/2 py-2 text-white bg-blue-500 rounded-lg text-md' onClick={handleUpdate}>Update</button>
                </div>
            </div>
        </div>
    )
}

export default UpdateBlog