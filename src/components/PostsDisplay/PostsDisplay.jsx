import React, { useEffect, useState } from 'react'
import SidePanel from '../SidePanel/SidePanel'
import SearchPage from '../SearchPage/SearchPage';
import { useParams } from 'react-router-dom';

function PostsDisplay()
{
    const DisplayType = Object.freeze(
        {
            Profile: 'profile',
            Search: 'search',
            Home: 'home'
        }
    )
    const [currentDisplay, setCurrentDisplay] = useState(DisplayType.Search);
    const {displayType} = useParams();

    useEffect(() =>
    {
        if(displayType == "profile")
        {
            setCurrentDisplay(DisplayType.Profile);
        }
        else if(displayType == "search")
        {
            setCurrentDisplay(DisplayType.Search);
        }
        else if(displayType == "home")
        {
            setCurrentDisplay(DisplayType.Home);
        }
    }, [displayType])

    return (
        <>
            { currentDisplay == DisplayType.Profile ? <h1>Profile Page</h1> : null }
            { currentDisplay == DisplayType.Search ? <SearchPage /> : null }
            { currentDisplay == DisplayType.Home ? <h1>Home Page</h1> : null }
        </>
    )
}

export default PostsDisplay