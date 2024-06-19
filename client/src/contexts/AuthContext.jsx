import { createContext } from "react";
import axios from 'axios'
import Cookies from 'js-cookie'

export const AuthContext = createContext()

const clearAllCookies = () => {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].split('=');
        const name = cookie[0];
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
    }
};

const URL = 'https://blogs-q477.onrender.com/api/auth'

export const AuthProvider = ({ children }) => {

    const register = async (user) => {
        const res = await axios.post(`${URL}/register`, user)
        return res
    }
    const verifyEmail = async (token) => {
        const res = await axios.get(`${URL}/verify/${token}`)
        return res
    }
    const login = async (user) => {
        const res = await axios.post(`${URL}/login`, user)
        Cookies.set('token', res.data.token)
        return res
    }
    const logout = async () => {
        const res = await axios.post(`${URL}/logout`)
        clearAllCookies()
        return res
    }
    const checkEmail = async (email) => {
        const res = await axios.post(`${URL}/checkEmail`, { email })
        return res
    }
    const verifyPasswordToken = async (token) => {
        const res = await axios.get(`${URL}/verifyPassword/${token}`)
        Cookies.set('verifyPassword', res.data.token)
        return res
    }
    const forgotPassword = async (user, token) => {
        const res = await axios.put(`${URL}/forgotPassword/${token}`, user)
        clearAllCookies()
        return res
    }
    return (
        <AuthContext.Provider value={{ register, verifyEmail, login, logout, checkEmail, verifyPasswordToken, forgotPassword }}>
            {children}
        </AuthContext.Provider>)
}