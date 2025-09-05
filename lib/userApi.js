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




export
{
    loginUser
}