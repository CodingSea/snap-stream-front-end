import axios from "axios";
import { jwtDecode } from "jwt-decode";
import axiosInstance from "./axiosConfig";

async function getPosts()
{
    try
    {
        const token = localStorage.getItem("token")
        const res = await axiosInstance.get(`${ import.meta.env.VITE_BACKEND_URL }/search/`);

        return res;
    }
    catch (error)
    {
        console.log(error)
    }
}




export
{
    getPosts
}