import React, { useEffect, useState } from 'react'
import { getProfile } from '../../../lib/postAPI';
import { useNavigate, useParams } from 'react-router-dom';

function ProfilePage()
{
    const navigate = useNavigate()
    const [posts, setPosts] = useState([{}])

    const [user, setUser] = useState(
        {
            id: -1,
            username: ""
        }
    )

    const { id } = useParams();

    async function listPosts()
    {
        try
        {
            const postsList = await getProfile(id);
            setPosts(postsList.data);
        }
        catch (error)
        {
            console.log(error);
        }
    }

    function handlePost(index)
    {
        navigate(`/profile/${ id }/post/${ index }`)
    }

    async function getCurrentUser()
    {
        try
        {
            const res = await getUser()
            const usr =
            {
                id: res.data.id,
                username: res.data.username
            }

            setUser(usr);
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
            <h1>Profile Page</h1>
            <button onClick={ () => { navigate('/post/new') } }>+</button>

            <div className='posts-container'>
                {
                    posts.map((post, index) => 
                    {
                        return (
                            <a key={ index } id={ index } onClick={ () => { handlePost(index) } }><img src={ post.file } alt="post-file" className="post-card" /></a>
                        )
                    })
                }
            </div>
        </>
    )
}

export default ProfilePage