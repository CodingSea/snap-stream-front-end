import React, { useEffect, useState } from 'react'
import SidePanel from '../SidePanel/SidePanel'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import "../../Main.css"
import PostDetails from '../PostDetails/PostDetails'
import { getPosts, searchPosts } from '../../../lib/postAPI'
import { RingLoader } from 'react-spinners'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

function SearchPage()
{
    const navigate = useNavigate()
    const [posts, setPosts] = useState([])
    const [formData, setFormData] = useState(
        {
            searchText: ""
        }
    );

    const { searchText } = useParams();

    async function listPosts()
    {
        try
        {
            if (searchText)
            {
                formData.searchText = searchText;
                const postsList = await searchPosts(formData.searchText);
                setPosts(postsList.data);
            }
            else
            {
                const postsList = await getPosts();
                setPosts(postsList.data);
            }
        }
        catch (error)
        {
            console.log(error);
        }
    }

    function handlePost(index)
    {
        if (formData.searchText == "")
        {
            navigate(`/search/post/${ index }`)
        }
        else
        {
            navigate(`/search/find/${ formData.searchText }/post/${ index }`)
        }
    }

    async function handleSearch(event)
    {
        event.preventDefault();

        try
        {
            if (formData.searchText == "")
            {
                navigate(`/search`)
                const postsList = await getPosts();
                setPosts(postsList.data);
            }
            else
            {
                navigate(`/search/find/${ formData.searchText }/`)
                const postsList = await searchPosts(formData.searchText);
                setPosts(postsList.data);
            }
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

            <div className='background'></div>

            <form onSubmit={ handleSearch } className='search-form'>
                <input type="text" placeholder='Search' name="searchText" onChange={ (event) => setFormData({ ...formData, searchText: event.target.value }) } value={ formData.searchText } />
                <FontAwesomeIcon icon={ faSearch } id='search-icon' />
            </form>

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

export default SearchPage