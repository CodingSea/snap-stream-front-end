import React, { useEffect, useState } from 'react'
import { commentOnPost, getComments } from '../../../lib/postAPI';

function CommentSection({ postId, userId })
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
            console.log(res.data);

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

            getCommentList()
        }
        catch (error)
        {
            console.log(error);
        }
    }

    useEffect(() =>
    {
        console.log("userid", userId)
        console.log("postId", postId)

        formData.user = userId;
        formData.post = postId;

        getCommentList();
    }, [])

    return (
        <div id='comment-section'>

            <div className='comment-list'>
                {
                    comments.length > 0
                        ?
                        comments.map((comment, index) =>
                        {
                            return (
                                <div key={ index }>
                                    <p>Name: { comment.user.username }</p>
                                    <p>{ comment.content }</p>
                                    <p>
                                        <span>
                                            { `${ new Date(comment.created_at).toLocaleDateString() } | ${ new Date(comment.created_at).toLocaleTimeString() }` }
                                        </span>
                                    </p>
                                </div>
                            )
                        })
                        :
                        null
                }
            </div>

            <form onSubmit={ handleSubmitComment }>
                <input type="text" name="content" placeholder='Add a comment...' onChange={ handleChange } />
                <button type='submit'>Submit</button>
            </form>
        </div>
    )
}

export default CommentSection