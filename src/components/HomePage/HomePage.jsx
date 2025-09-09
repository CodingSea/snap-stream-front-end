import React, { useEffect, useState } from 'react'
import { getFollowingPosts } from '../../../lib/postAPI';
import { useNavigate, useParams } from 'react-router-dom';
import { RingLoader } from 'react-spinners';

function HomePage()
{
    const navigate = useNavigate()
    const [posts, setPosts] = useState([])

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
            const postsList = await getFollowingPosts();
            setPosts(postsList.data);
        }
        catch (error)
        {
            console.log(error);
        }
    }

    function handlePost(index)
    {
        navigate(`/home/${ id }/post/${ index }`)
    }

    useEffect(() =>
    {
        listPosts();
    }, [])

    return (
        <>
            <h1>Home Page</h1>
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

export default HomePage