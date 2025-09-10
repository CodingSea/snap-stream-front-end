import axios from "axios";
import { jwtDecode } from "jwt-decode";
import axiosInstance from "./axiosConfig";

async function loginUser(credentials)
{
    try
    {
        const token = localStorage.getItem("token")

        const res = await axiosInstance.post(`${ import.meta.env.VITE_BACKEND_URL }/auth/login/`,
            {
                username: credentials.username,
                password: credentials.password
            }
        );

        return res;
    }
    catch (error)
    {
        alert("Either the username or the password is incorrect")
        console.log(error)
    }
}

async function signupUser(formData)
{
    try
    {
        const res = await axios.post(`${ import.meta.env.VITE_BACKEND_URL }/signup/`,
            {
                username: formData.username,
                password: formData.password
            }
        )

        return res;
    }
    catch (error)
    {
        alert("Either the username or the password is incorrect")
        console.log(error);
    }
}

async function getCurrentUser()
{
    try
    {
        const token = localStorage.getItem("token");
        const decodedToken = jwtDecode(token);
        const res = await axiosInstance.get(`${ import.meta.env.VITE_BACKEND_URL }/user/${ decodedToken.user_id }`);

        return res;
    }
    catch (error)
    {
        console.log(error);
    }
}

async function getUser(id)
{
    try
    {
        const res = await axiosInstance.get(`${ import.meta.env.VITE_BACKEND_URL }/user/${ id }`);

        return res;
    }
    catch (error)
    {
        console.log(error);
    }
}

async function followUser(userId)
{
    try
    {
        const token = localStorage.getItem("token");
        const decodedToken = jwtDecode(token);
        return await axiosInstance.post(`${ import.meta.env.VITE_BACKEND_URL }/user/follow/${ userId }/`, { "userId": decodedToken.user_id })
    }
    catch (error)
    {
        console.log(error);
    }
}

export
{
    loginUser,
    signupUser,
    getCurrentUser,
    getUser,
    followUser
}