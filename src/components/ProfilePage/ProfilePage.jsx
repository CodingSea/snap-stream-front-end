import React, { useEffect, useState } from 'react'
import { getProfile } from '../../../lib/postAPI';
import { useNavigate, useParams } from 'react-router-dom';
import { RingLoader } from 'react-spinners';
import { getUser } from '../../../lib/userAPI';

function ProfilePage()
{
    const navigate = useNavigate()
    const [posts, setPosts] = useState([])
    const [userProfile, setUserProfile] = useState({});

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

    async function getUserProfile()
    {
        try
        {
            const u = await getUser(id);

            setUserProfile(u.data);
        }
        catch(error)
        {
            console.log(error);
        }
    }

    useEffect(() =>
    {
        listPosts();
        getUserProfile();
    }, [])

    return (
        <>
            {
                userProfile
                ?
                <h1>{userProfile.username}</h1>
                :
                null
            }

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

export default ProfilePage