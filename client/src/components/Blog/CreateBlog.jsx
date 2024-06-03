import React, { useContext, useState } from 'react'
import { BlogContext } from '../../contexts/BlogContext'

const CreateBlog = () => {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [image, setImage] = useState(null)

    const [msg, setMsg] = useState('')
    const [err, setErr] = useState('')

    const { createBlog } = useContext(BlogContext)

    const handlePublish = async (e) => {
        e.preventDefault()
        try {
            const token = document.cookie.split('=')[1]
            const formData = new FormData()
            formData.append('title', title)
            formData.append('content', content)
            formData.append('image', image)
            const res = await createBlog(formData, token)
            setMsg(res.data.message)
            setTimeout(() => {
                window.history.back();
            }, 3000)
        } catch (error) {
            console.error('Error in Create Blog File', error)
            setErr(error.response.data.message)
        }
    }
    return (
        <div className=''>
            <div className='w-2/4 mx-auto'>
                <div className=' flex justify-center'>
                    {
                        msg ? <p className='text-center font-semibold text-green-700 px-10'>{msg}</p> : <p className='text-center font-semibold text-red-700 px-10'>{err}</p>
                    }
                </div>
                <div className='border-b-2 m-3 p-2 text-3xl'>
                    <input className='outline-none' type="text" placeholder='Title' onChange={(e) => setTitle(e.target.value)} value={title} name='title' />
                </div>
                <div className='border-b-2 m-3 p-2 text-xl'>
                    <textarea className='outline-none' rows={10} cols={65} type="text" placeholder='Tell Your Story...' onChange={(e) => setContent(e.target.value)} value={content} name='content' />
                </div>
                <div className='m-3 p-2'>
                    <input className='outline-none' type="file" onChange={(e) => setImage(e.target.files[0])} />
                </div>
                <div className='m-3 p-2 flex justify-center'>
                    <button className='w-1/2 py-2 text-white bg-blue-500 rounded-lg text-md' onClick={handlePublish}>Publish</button>
                </div>
            </div>
        </div>
    )
}

export default CreateBlog