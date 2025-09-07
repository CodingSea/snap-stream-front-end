import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { href, useNavigate, useParams } from 'react-router-dom'
import SidePanel from '../SidePanel/SidePanel';
import { deletePost, getPosts, updatePost } from '../../../lib/postAPI';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faComment, faEllipsis } from '@fortawesome/free-solid-svg-icons';
import Popup from 'reactjs-popup';
import { getUser } from '../../../lib/userAPI';

function PostDetails()
{
    const { pk } = useParams();
    const navigate = useNavigate()
    const [posts, setPosts] = useState([{}])
    const [selectedIndex, setSelectedIndex] = useState();
    const [user, setUser] = useState(
        {
            id: -1,
            username: ""
        }
    )

    const [isOpen, setIsOpen] = useState(false);
    const [isOpenEdit, setIsOpenEdit] = useState(false);

    const [formData, setFormData] = useState
        (
            {
                id: -1,
                caption: "",
                file: "",
                file_id: "",
                user: -1,
                created_at: ""
            }
        )

    function handleChange(event)
    {
        setFormData({ ...formData, [event.target.name]: event.target.value })
    }

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

            console.log(usr)

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
        getCurrentUser();
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

    async function handleSubmit(event)
    {
        try
        {
            await updatePost(formData.id, formData)

        } catch (error)
        {
            console.log(error)
        }
    }

    function selectPost(post)
    {
        const p =
        {
            id: post.id,
            caption: post.caption,
            file: post.file,
            file_id: post.file_id,
            user: post.user.id,
            created_at: post.created_at
        }

        setFormData(p);
    }

    return (
        <>
            <button onClick={ () => { navigate(-1, { replace: true, state: { displayType: "dddd" } }) } }>Back</button>

            {
                selectedIndex != undefined && user.id != -1 ?
                    posts.slice(selectedIndex).map((post, index) => 
                    {
                        return (
                            <div key={ index }>
                                <div className='post-details'>

                                    <div style={ { display: "flex", justifyContent: "space-between", alignItems: "center" } }>
                                        <a onClick={ () => { navigate(`/profile/${ post.user.id }`) } }><h2>{ posts[0].user.username }</h2></a>

                                        

                                        {
                                            user.id == post.user.id
                                                ?
                                                <FontAwesomeIcon icon={ faEllipsis } style={ { fontSize: "2em" } } className='icon' onClick={ () => { selectPost(post);; setIsOpen(!isOpen) } } />
                                                :
                                                null
                                        }

                                        <Popup open={ isOpen } position={ 'center center' }>
                                            <div className='post-popup'>
                                                <p>Post Form</p>

                                                <button onClick={ () => { setIsOpenEdit(!isOpenEdit); setIsOpen(false); } }>Edit</button>

                                                <form onSubmit={ (event) => handleDeletePost(event, post) }>
                                                    <button type='submit'>Delete</button>
                                                </form>
                                            </div>
                                        </Popup>

                                        <Popup open={ isOpenEdit } position={ "center center" }>
                                            <form onSubmit={ (event) => handleSubmit(event) }>
                                                <h2>Edit Post</h2>

                                                <label htmlFor="caption">Caption: </label>
                                                <textarea
                                                    name='caption'
                                                    placeholder="caption"
                                                    value={ formData.caption }
                                                    onChange={ handleChange }
                                                />

                                                <br />

                                                <button type="submit">Post</button>
                                            </form>
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