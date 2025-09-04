import React, { useEffect, useState } from 'react'
import SidePanel from '../SidePanel/SidePanel'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import "../../Main.css"

function SearchPage({ token, handleLogout })
{
    const navigate = useNavigate()
    const [posts, setPosts] = useState([{}])

    async function listPosts()
    {
        try
        {
            const postsList = await axios.get(`${ import.meta.env.VITE_BACKEND_URL }/search/`)
            setPosts(postsList.data);
        }
        catch (error)
        {
            console.log(error);
        }
    }

    useEffect(() =>
    {
        listPosts();
    }, [])

    return (
        <>
            <SidePanel token={ token } handleLogout={ handleLogout } />

            <h1>Search Page</h1>
            <button onClick={ () => { navigate('/post/new') } }>+</button>

            <div className='posts-container'>
                {
                    posts.map((post, index) => 
                    {
                        return (
                            <img src={ post.file } alt="post file" key={ index } className="post-card" />
                        )
                    })
                }
            </div>

        </>
    )
}

export default SearchPage