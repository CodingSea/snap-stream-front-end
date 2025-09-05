import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { href, useNavigate, useParams } from 'react-router-dom'
import SidePanel from '../SidePanel/SidePanel';
import { getPosts } from '../../../lib/postAPI';

function PostDetails()
{
    const { pk } = useParams();
    const navigate = useNavigate()
    const [posts, setPosts] = useState([{}])
    const [selectedIndex, setSelectedIndex] = useState();

    async function listPosts()
    {
        try
        {
            const postsList = await getPosts();
            setPosts(postsList.data);
            setSelectedIndex(postsList.data.findIndex(p => p.id === parseInt(pk)));
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
            <button onClick={ () => { navigate(-1) } }>Back</button>

            {
                selectedIndex != undefined ?
                    posts.slice(selectedIndex).map((p, index) => 
                    {
                        return (
                            <div key={index}>
                                <div className='post-details'>
                                    <img src={ p.file } alt="post-file" />
                                    <p>{ p.caption }</p>
                                </div>
                                { p != posts.slice(selectedIndex).at(-1) ? <hr /> : null }
                            </div>
                        )
                    })
                    :
                    null
            }
        </>
    )
}

export default PostDetails