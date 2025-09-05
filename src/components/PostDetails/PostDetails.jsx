import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import SidePanel from '../SidePanel/SidePanel';

function PostDetails({ posts, setPosts })
{
    const { pk } = useParams();
    const [post, setPost] = useState({})

    async function getPost()
    {
        try
        {
            const res = await axios.get(`${ import.meta.env.VITE_BACKEND_URL }/search/${pk}`)
            setPost(res.data)
        }
        catch(error)
        {
            console.log(error)
        }
    }

    useEffect(() =>
    {
        getPost();
    }, [])

    const selectedIndex = posts.findIndex(p => p.id === post.id);

    return (
        <>
            <SidePanel />

            <h1>Post Details</h1>
            {
                posts.slice(selectedIndex).map((p, index) => 
                {
                    return (
                        <>
                            <div className='post-details'>
                                <img src={ p.file } alt="post-file" />
                                <p>{p.caption}</p>
                                

                            </div>
                            <hr />
                        </>
                    )
                })
            }
        </>
    )
}

export default PostDetails