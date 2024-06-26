import { createContext } from "react";
import axios from 'axios'

export const BlogContext = createContext()

const URL = 'https://blogs-q477.onrender.com/api/blog'

export const BlogProvider = ({ children }) => {
    const createBlog = async (blogData, token) => {
        const res = await axios.post(`${URL}/createBlog/${token}`, blogData)
        return res
    }
    const getAllBlog = async () => {
        const res = await axios.get(`${URL}/getAllBlog`)
        return res
    }
    const getBlogByUser = async (token) => {
        const res = await axios.get(`${URL}/getBlogByUser/${token}`)
        return res
    }
    const getBlogById = async (id) => {
        const res = await axios.get(`${URL}/getBlogById/${id}`)
        return res
    }
    const UpdateBlogById = async (blogData, id) => {
        const res = await axios.put(`${URL}/updateBlogById/${id}`, blogData)
        return res
    }
    const DeleteBlog = async (id) => {
        const res = await axios.delete(`${URL}/deleteBlog/${id}`)
        return res
    }
    return (
        <BlogContext.Provider value={{ createBlog, getAllBlog, getBlogByUser, getBlogById, UpdateBlogById, DeleteBlog }}>
            {children}
        </BlogContext.Provider>
    )
}