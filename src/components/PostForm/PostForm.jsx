import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import SidePanel from '../SidePanel/SidePanel'
import axios from 'axios'
import { jwtDecode } from 'jwt-decode'
import { createPost } from '../../../lib/postAPI'

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
            await createPost(formData);

            navigate(-1)
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
            <div className='background'></div>

            <form onSubmit={ handleSubmit } className='create-form'>
                <h2>Make a New Post</h2>
                <label htmlFor="file">File: </label>
                <input
                    name='file'
                    type='file'
                    onChange={ handleFileChange }
                />

                <br />

                <label htmlFor="caption">Caption: </label>
                <textarea
                    name='caption'
                    placeholder="caption"
                    value={ formData.caption }
                    onChange={ handleChange }
                />

                <br />

                <button type="submit">Post</button>
            </form>
        </>
    )
}

export default PostForm