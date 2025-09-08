import { faComment, faEllipsis, faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react'
import Popup from 'reactjs-popup';
import { likePost, updatePost } from '../../../lib/postAPI';
import { useNavigate } from 'react-router'

function Post({ post, index, posts, user, selectedIndex, setSelectedIndex, postId, listPosts })
{
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenEdit, setIsOpenEdit] = useState(false);
    const [isCalled, setIsCalled] = useState(false);

    const navigate = useNavigate()
    const [formData, setFormData] = useState(
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

    async function handleSubmit(event, index)
    {
        try
        {
            event.preventDefault();

            await updatePost(formData.id, formData)

            listPosts()


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

    async function handleLike(post, index)
    {
        try
        {
            await likePost(post.id)

            listPosts();

        }
        catch (error)
        {
            console.log(error)
        }
    }

    useEffect(() =>
    {
        if (isCalled == false)
        {
            const targetElement = document.getElementById(parseInt(postId));
            if (targetElement)
            {
                targetElement.scrollIntoView();
            }
            setIsCalled(true);
        }
    }, [posts])

    return (
        <div key={ index } id={ index }>
            <div className='post-details'>

                <div style={ { display: "flex", justifyContent: "space-between", alignItems: "center" } }>
                    <a onClick={ () => { navigate(`/profile/${ post.user.id }`, { replace: true, state: { displayType: "Profile" } }) } }>
                        <h2>{ posts[0].user.username }</h2>
                    </a>



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
                        <form onSubmit={ (event) => handleSubmit(event, index) }>
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
                        {
                            post.likes.some(u => u.id == user.id)
                                ?
                                <FontAwesomeIcon icon={ faHeart } color='red' className='icon' onClick={ () => { handleLike(post, index) } } />
                                :
                                <FontAwesomeIcon icon={ faHeart } className='icon' onClick={ () => { handleLike(post, index) } } />
                        }

                        <p>{ post.likes.length }</p>
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
        </div >
    )
}

export default Post