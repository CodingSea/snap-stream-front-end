import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { href, useNavigate, useParams } from 'react-router-dom'
import SidePanel from '../SidePanel/SidePanel';

function PostDetails()
{
    const { pk } = useParams();
    const [post, setPost] = useState({})
    const navigate = useNavigate()
    const [posts, setPosts] = useState([{}])
    const [selectedIndex, setSelectedIndex] = useState();

    async function listPosts()
    {
        try
        {
            const postsList = await axios.get(`${ import.meta.env.VITE_BACKEND_URL }/search/`)
            setPosts(postsList.data);
            console.log(pk)
            setSelectedIndex(posts.findIndex(p => p.id === parseInt(pk)));
            console.log(selectedIndex)
        }
        catch (error)
        {
            console.log(error);
        }
    }

    useEffect(() =>
    {
        listPosts();
    }, [selectedIndex])


    return (
        <>
            <SidePanel />

            <button onClick={() => { navigate(-1) }}>Back</button>

            <h1>Post Details</h1>

            {
                posts.slice(selectedIndex).map((p, index) => 
                {
                    return (
                        <>
                            <div className='post-details' key={index}>
                                <img src={ p.file } alt="post-file" />
                                <p>{p.caption}</p>
                                

                            </div>
                            { p != posts.slice(selectedIndex).at(-1) ? <hr /> : null }
                        </>
                    )
                })
            }
        </>
    )
}

export default PostDetails