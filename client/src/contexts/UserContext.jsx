import { createContext } from "react";
import axios from 'axios'

export const UserContext = createContext()

const URL = 'https://blogs-q477.onrender.com/api/user'

export const UserProvider = ({ children }) => {

    const getProfile = async (token) => {
        const res = await axios.get(`${URL}/getProfile/${token}`)
        return (res.data.user)
    }
    const getProfileById = async (id) => {
        const res = await axios.get(`${URL}/getProfileById/${id}`)
        return (res.data.user)
    }
    const updateProfileData = async (user, token) => {
        console.log(user)
        const res = await axios.put(`${URL}/updateProfile/${token}`, user)
        return (res)
    }
    const updateProfilePic = async (pic, token) => {
        const res = await axios.put(`${URL}/updateProfilePic/${token}`, pic);
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
        <UserContext.Provider value={{ getProfile, getProfileById, updateProfileData, updateProfilePic, changePassword, deviceInfo }}>
            {children}
        </UserContext.Provider>)
}