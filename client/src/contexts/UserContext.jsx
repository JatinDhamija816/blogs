import { createContext } from "react";
import axios from 'axios'

export const UserContext = createContext()

const URL = 'http://localhost:8000/api/user'

export const UserProvider = ({ children }) => {

    const getProfile = async (token) => {
        const res = await axios.get(`${URL}/getProfile/${token}`)
        return (res.data.user)
    }
    const updateProfile = async (user, token) => {
        const res = await axios.put(`${URL}/updateProfile/${token}`, user)
        return (res)
    }
    const changePassword = async (user, token) => {
        const res = await axios.put(`${URL}/changePassword/${token}`, user)
        return res
    }
    const deviceInfo = async (token) => {
        const res = await axios.get(`${URL}/deviceInfo/${token}`)
        return res.data.activity
    }
    return (
        <UserContext.Provider value={{ getProfile, updateProfile, changePassword, deviceInfo }}>
            {children}
        </UserContext.Provider>)
}