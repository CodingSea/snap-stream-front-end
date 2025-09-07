import React, { useEffect, useState } from 'react'
import SidePanel from '../SidePanel/SidePanel'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import "../../Main.css"
import PostDetails from '../PostDetails/PostDetails'
import { getPosts } from '../../../lib/postAPI'
import { RingLoader } from 'react-spinners'

function SearchPage()
{
    const navigate = useNavigate()
    const [posts, setPosts] = useState([])

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

    function handlePost(index)
    {
        navigate(`/search/post/${ index }`)
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
                    posts.length > 0
                    ?
                    posts.map((post, index) => 
                    {
                        return (
                            <a key={ index } id={ index } onClick={ () => { handlePost(index) } }><img src={ post.file } alt="post-file" className="post-card" /></a>
                        )
                    })
                    :
                    <RingLoader color='#007BFF' />
                }
            </div>

        </>
    )
}

export default SearchPage