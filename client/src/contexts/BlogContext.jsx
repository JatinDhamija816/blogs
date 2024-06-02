import { createContext } from "react";
import axios from 'axios'

export const BlogContext = createContext()

const URL = 'http://localhost:8000/api/blog'

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
    return (
        <BlogContext.Provider value={{ createBlog, getAllBlog, getBlogByUser }}>
            {children}
        </BlogContext.Provider>
    )
}