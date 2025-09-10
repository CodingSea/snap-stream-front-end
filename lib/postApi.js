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

async function updatePost(id, data)
{
    try
    {
        const res = await axiosInstance.put(`${ import.meta.env.VITE_BACKEND_URL }/post/${ id }/`, data)
        return res;
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
        await axiosInstance.delete(`${ import.meta.env.VITE_BACKEND_URL }/post/${ id }/`)
    }
    catch (error)
    {
        console.log(error);
    }
}

async function getProfile(id)
{
    try
    {
        return await axiosInstance.get(`${ import.meta.env.VITE_BACKEND_URL }/profile/${ id }/`)
    }
    catch (error)
    {
        console.log(error);
    }
}

async function likePost(postId)
{
    try
    {
        const token = localStorage.getItem("token");
        const decodedToken = jwtDecode(token);
        return await axiosInstance.get(`${ import.meta.env.VITE_BACKEND_URL }/post/${ decodedToken.user_id }/${ postId }/like/`)
    }
    catch (error)
    {
        console.log(error);
    }
}

async function searchPosts(searchText)
{
    try
    {
        const res = await axiosInstance.post(`${ import.meta.env.VITE_BACKEND_URL }/search/find/`, { "search_text": searchText })

        return res;
    }
    catch (error)
    {
        console.log(error);
    }
}

async function getFollowingPosts()
{
    try
    {
        const token = localStorage.getItem("token");
        const decodedToken = jwtDecode(token);
        const res = await axiosInstance.get(`${ import.meta.env.VITE_BACKEND_URL }/home/${ decodedToken.user_id }/`)

        return res;
    }
    catch (error)
    {
        console.log(error);
    }
}

async function commentOnPost(data)
{
    try
    {
        const token = localStorage.getItem("token");
        const decodedToken = jwtDecode(token);
        const res = await axiosInstance.post(`${ import.meta.env.VITE_BACKEND_URL }/post/${decodedToken.user_id}/comment/`, data)

        return res;
    }
    catch (error)
    {
        console.log(error);
    }
}

async function getComments(postId)
{
    try
    {
        const res = await axiosInstance.get(`${ import.meta.env.VITE_BACKEND_URL }/post/${postId}/comment-list/`)

        return res;
    }
    catch (error)
    {
        console.log(error);
    }
}

export
{
    getPosts,
    createPost,
    updatePost,
    deletePost,
    getProfile,
    likePost,
    searchPosts,
    getFollowingPosts,
    commentOnPost,
    getComments
}