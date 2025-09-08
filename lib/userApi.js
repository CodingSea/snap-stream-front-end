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
    catch(error)
    {
        console.log(error);
    }
}

async function getUser()
{
    try
    {
        const token = localStorage.getItem("token");
        const decodedToken = jwtDecode(token);
        const res = await axiosInstance.get(`${ import.meta.env.VITE_BACKEND_URL }/user/${decodedToken.user_id}`);

        return res;
    }
    catch(error)
    {
        console.log(error);
    }
}


export
{
    loginUser,
    signupUser,
    getUser
}