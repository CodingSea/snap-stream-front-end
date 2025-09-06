import React, { useEffect, useState } from 'react'
import SidePanel from '../SidePanel/SidePanel'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import "../../Main.css"
import PostDetails from '../PostDetails/PostDetails'
import { getPosts } from '../../../lib/postAPI'

function SearchPage()
{
    const navigate = useNavigate()
    const [posts, setPosts] = useState([{}])

    async function listPosts()
    {
        try
        {
            const postsList = await getPosts();
            setPosts(postsList.data);
        }
        catch (error)
        {
            console.log(error);
        }
    }

    function handlePost(post)
    {
        navigate(`/search/${post.id}`)
    }

    useEffect(() =>
    {
        listPosts();
    }, [])

    return (
        <>
            <h1>Search Page</h1>
            <button onClick={ () => { navigate('/post/new') } }>+</button>

            <div className='posts-container'>
                {
                    posts.map((post, index) => 
                    {
                        return (
                            <a key={ index } onClick={() => { handlePost(post) }}><img src={ post.file } alt="post-file" className="post-card" /></a>
                        )
                    })
                }
            </div>

        </>
    )
}

export default SearchPage