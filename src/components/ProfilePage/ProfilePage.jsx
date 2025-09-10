import React, { useEffect, useState } from 'react'
import { getFollowingPosts, getProfile } from '../../../lib/postAPI';
import { useNavigate, useParams } from 'react-router-dom';
import { RingLoader } from 'react-spinners';
import { followUser, getCurrentUser, getUser } from '../../../lib/userAPI';
import CommentSection from '../CommentSection/CommentSection';

function ProfilePage()
{
    const navigate = useNavigate()
    const [posts, setPosts] = useState([])
    const [userProfile, setUserProfile] = useState({});

    const [user, setUser] = useState()

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
        catch (error)
        {
            console.log(error);
        }
    }

    async function handleFollow(event)
    {
        try
        {
            event.preventDefault();

            await followUser(id);
            await getCurrentLoggedInUser();
        }
        catch (error)
        {
            console.log(error);
        }
    }

    async function getCurrentLoggedInUser()
    {
        try
        {
            const res = await getCurrentUser()

            setUser(res.data);
        }
        catch (error)
        {
            console.log(error);
        }
    }

    useEffect(() =>
    {
        getCurrentLoggedInUser();
        listPosts();
        getUserProfile();
    }, [])

    return (
        <>
            {
                userProfile
                ?
                <>
                    <h1>{ userProfile.username }</h1>
                    <h3>Following: 000 | Followers: 000</h3>
                </>
                :
                null
            }

            {
                user && user.id != userProfile.id
                    ?
                    <>
                        <form onSubmit={ handleFollow }>
                            {
                                user.followings.some(x => x == id)
                                    ?
                                    <button type='submit'>Unfollow</button>
                                    :
                                    <button type='submit'>Follow</button>
                            }
                        </form>
                    </>
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