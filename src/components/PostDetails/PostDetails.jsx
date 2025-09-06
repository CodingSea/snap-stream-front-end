import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { href, useNavigate, useParams } from 'react-router-dom'
import SidePanel from '../SidePanel/SidePanel';
import { getPosts } from '../../../lib/postAPI';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faComment } from '@fortawesome/free-solid-svg-icons';

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
            <button onClick={ () => { navigate(-1, { replace: true, state: { displayType: "dddd" } }) } }>Back</button>

            {
                selectedIndex != undefined ?
                    posts.slice(selectedIndex).map((post, index) => 
                    {
                        return (
                            <div key={ index }>
                                <div className='post-details'>

                                    <a onClick={ () => { navigate(`/profile`) } }><h2>{ posts[0].user.username }</h2></a>

                                    <img src={ post.file } alt="post-file" />

                                    <br />
                                    <div style={ { display: "flex", gap: "1em" } }>
                                        <div style={ { display: "flex", alignItems: "center" } }>
                                            <FontAwesomeIcon icon={ faHeart } className='icon' />
                                            <p>000</p>
                                        </div>
                                        <div style={ { display: "flex", alignItems: "center" } }>
                                            <FontAwesomeIcon icon={ faComment } className='icon' />
                                            <p>000</p>
                                        </div>
                                    </div>
                                    <p>{ post.caption }</p>

                                    <p><span>{ `${ new Date(post.created_at).toLocaleDateString() } | ${ new Date(post.created_at).toLocaleTimeString() }` }</span></p>

                                </div>
                                { post != posts.slice(selectedIndex).at(-1) ? <hr /> : null }
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