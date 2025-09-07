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


async function createPost(formData)
{
    try
    {
        const token = localStorage.getItem('token');
        await axios.post(`${ import.meta.env.VITE_BACKEND_URL }/post/new/`,
            {
                file: formData.file,
                caption: formData.caption,
                user: parseInt(formData.user),
                file_id: ""
            },
            {
                headers:
                {
                    'Authorization': `Bearer ${ token }`,
                    'Content-Type': 'multipart/form-data'
                }
            }
        )
    }
    catch (error)
    {
        console.log(error);
    }
}

async function deletePost(id)
{
    try
    {
        await axiosInstance.delete(`${ import.meta.env.VITE_BACKEND_URL }/post/${id}/`)
    }
    catch(error)
    {
        console.log(error);
    }
}

export
{
    getPosts,
    createPost,
    deletePost
}