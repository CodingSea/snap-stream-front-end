import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import SidePanel from '../SidePanel/SidePanel'
import axios from 'axios'
import { jwtDecode } from 'jwt-decode'

function PostForm()
{
    const [formData, setFormData] = useState
        (
            {
                file: null,
                file_id: "",
                caption: "",
                user: ""
            }
        )
    const navigate = useNavigate()

    function handleChange(event)
    {
        setFormData({ ...formData, [event.target.name]: event.target.value })
    }

    function handleFileChange(event)
    {
        setFormData({ ...formData, file: event.target.files[0] })
    }

    async function handleSubmit(event)
    {
        event.preventDefault()
        try
        {
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
                        'Content-Type': 'multipart/form-data'
                    }
                }
            )

            navigate('/search')
        } catch (error)
        {
            console.log(error)
        }
    }

    useEffect(() =>
    {
        const token = localStorage.getItem('token');
        const decodedToken = jwtDecode(token);
        formData.user = decodedToken.user_id;
    }, [])

    return (
        <>
            <SidePanel />

            <form onSubmit={ handleSubmit }>
                <h2>Sign Up</h2>
                <label htmlFor="file">File: </label>
                <input
                    name='file'
                    type='file'
                    onChange={ handleFileChange }
                />

                <label htmlFor="caption">Caption: </label>
                <input
                    name='caption'
                    placeholder="caption"
                    type="text"
                    value={ formData.caption }
                    onChange={ handleChange }
                />
                <button type="submit">Post</button>
            </form>
        </>
    )
}

export default PostForm