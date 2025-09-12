import React, { useEffect, useState } from 'react'
import { commentOnPost, getComments } from '../../../lib/postApi';

function CommentSection({ postId, userId, isOpen, handleClickOutside, setIsOpen, listPosts })
{
    const [formData, setFormData] = useState(
        {
            content: '',
            user: -1,
            post: -1
        }
    )

    const [comments, setComments] = useState([]);

    async function getCommentList()
    {
        try
        {
            const res = await getComments(postId);

            setComments(res.data);
        }
        catch (error)
        {
            console.log(error);
        }
    }

    function handleChange(event)
    {
        setFormData({ ...formData, [event.target.name]: event.target.value })
    }

    async function handleSubmitComment(event)
    {
        try
        {
            event.preventDefault();

            await commentOnPost(formData);

            setFormData(
                {
                    content: '',
                    user: -1,
                    post: -1
                }
            )

            getCommentList();
            await listPosts();
        }
        catch (error)
        {
            console.log(error);
        }
    }

    useEffect(() =>
    {
        if (postId == -1 || isOpen == false) return;

        formData.user = userId;
        formData.post = postId;

        getCommentList();
    }, [isOpen])

    return (
        <div id={ isOpen ? 'comment-section-open' : 'comment-section-closed' }>

            <div className='comment-list'>
                <button onClick={ () => { setIsOpen(false); setComments([]); postId = -1; } }>Close</button>
                {
                    comments.length > 0
                        ?
                        <>
                            {
                                comments.map((comment, index) =>
                                {
                                    return (
                                        <div key={ index } className='comment'>
                                            <div className='comment-header'>
                                                <strong>Name: { comment.user.username }</strong>
                                                <span>
                                                    { `${ new Date(comment.created_at).toLocaleDateString() } | ${ new Date(comment.created_at).toLocaleTimeString() }` }
                                                </span>
                                            </div>
                                            <p>{ comment.content }</p>
                                        </div>
                                    )
                                })
                            }
                        </>
                        :
                        null
                }
            </div>

            <form onSubmit={ handleSubmitComment }>
                <input type="text" name="content" placeholder='Add a comment...' onChange={ handleChange } value={ formData.content } />
                <button type='submit'>Submit</button>
            </form>
        </div>
    )
}

export default CommentSection