import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { href, useNavigate, useParams } from 'react-router-dom'
import SidePanel from '../SidePanel/SidePanel';
import { deletePost, getFollowingPosts, getPosts, getProfile, searchPosts, updatePost } from '../../../lib/postAPI';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faComment, faEllipsis } from '@fortawesome/free-solid-svg-icons';
import Popup from 'reactjs-popup';
import { getCurrentUser } from '../../../lib/userApi';
import { RingLoader } from 'react-spinners';
import Post from '../Post/Post';
import CommentSection from '../CommentSection/CommentSection';

function PostDetails()
{
    const { id, postId, displayType, searchText } = useParams();
    const navigate = useNavigate()
    const [posts, setPosts] = useState([{}])
    const [selectedIndex, setSelectedIndex] = useState();
    const [user, setUser] = useState(
        {
            id: -1,
            username: ""
        }
    )

    const [isCommentOpen, setIsCommentOpen] = useState(false);
    const [selectedPostId, setSelectedPostId] = useState(-1);

    async function listPosts()
    {
        try
        {
            if (displayType)
            {
                if (displayType == "search" && !searchText)
                {
                    const postsList = await getPosts();
                    setPosts(postsList.data);
                }
                else if (displayType == "search" && searchText)
                {
                    const postsList = await searchPosts(searchText);
                    setPosts(postsList.data);
                }
                else if (displayType == "profile")
                {
                    const postsList = await getProfile(id);
                    setPosts(postsList.data);
                }
                else if (displayType == "home")
                {
                    const postsList = await getFollowingPosts();
                    setPosts(postsList.data);
                }
            }

            setSelectedIndex(postId);
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

    function openCommentSection(tempId)
    {
        setSelectedPostId(tempId);
        setIsCommentOpen(true);
    }

    function handleClickOutside(e)
    {
        if (this.submitPopoverRef.contains(e.target))
        {

            return;
        }

        setIsCommentOpen(false);

        this.handleClick();
    }

    useEffect(() =>
    {
        listPosts();
        getCurrentLoggedInUser();

    }, [])

    return (
        <>
            {
                selectedIndex != undefined && user.id != -1
                    ?
                    posts.map((post, index) => 
                    {
                        return (
                            <Post
                                post={ post }
                                index={ index }
                                key={ index }
                                posts={ posts }
                                user={ user }
                                selectedIndex={ selectedIndex }
                                setSelectedIndex={ setSelectedIndex }
                                postId={ postId }
                                listPosts={ listPosts }
                                openCommentSection={ openCommentSection }
                            />
                        )
                    })
                    :
                    <RingLoader color='#007BFF' />
            }

            <CommentSection postId={ selectedPostId } userId={ user.id } isOpen={ isCommentOpen } setIsOpen={ setIsCommentOpen } handleClickOutside={ handleClickOutside } listPosts={ listPosts } />
        </>
    )
}

export default PostDetails