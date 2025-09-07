import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { href, useNavigate, useParams } from 'react-router-dom'
import SidePanel from '../SidePanel/SidePanel';
import { deletePost, getPosts } from '../../../lib/postAPI';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faComment, faEllipsis } from '@fortawesome/free-solid-svg-icons';
import Popup from 'reactjs-popup';

function PostDetails()
{
    const { pk } = useParams();
    const navigate = useNavigate()
    const [posts, setPosts] = useState([{}])
    const [selectedIndex, setSelectedIndex] = useState();

    const [isOpen, setIsOpen] = useState(false);

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

    async function handleDeletePost(event, post)
    {
        try
        {
            event.preventDefault();

            await deletePost(post.id);

            navigate(-1);
        }
        catch (error)
        {
            console.log(error);
        }
    }

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

                                    <div style={ { display: "flex", justifyContent: "space-between", alignItems: "center" } }>
                                        <a onClick={ () => { navigate(`/profile/${ post.user.id }`) } }><h2>{ posts[0].user.username }</h2></a>

                                        <FontAwesomeIcon icon={ faEllipsis } style={ { fontSize: "2em" } } className='icon' onClick={ () => { setIsOpen(!isOpen) } } />

                                        <Popup open={ isOpen } position={ 'center center' }>
                                            <div className='post-popup'>
                                                <p>Post Form</p>
                                                <button>Edit</button>
                                                <form onSubmit={ (event) => handleDeletePost(event, post) }>
                                                    <button type='submit'>Delete</button>
                                                </form>
                                            </div>
                                        </Popup>
                                    </div>

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