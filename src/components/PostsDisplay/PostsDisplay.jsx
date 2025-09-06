import React, { useEffect, useState } from 'react'
import SidePanel from '../SidePanel/SidePanel'
import SearchPage from '../SearchPage/SearchPage';
import { useLocation, useParams } from 'react-router-dom';

function PostsDisplay({ token, handleLogout, user, setUser })
{
    const DisplayType = Object.freeze(
        {
            Profile: 'profile',
            Search: 'search',
            Home: 'home'
        }
    )
    const [currentDisplay, setCurrentDisplay] = useState(DisplayType.Search);

    const location = useLocation();
    const receivedData = location.state;

    useEffect(() =>
    {
        if(!receivedData) return;
        const displayType = receivedData.displayType;

        
        if (displayType == "Profile")
        {
            setCurrentDisplay(DisplayType.Profile);
        }
        else if (displayType == "Search")
        {
            setCurrentDisplay(DisplayType.Search);
        }
        else if (displayType == "Home")
        {
            setCurrentDisplay(DisplayType.Home);
        }

        window.history.replaceState({}, '')
    }, [])

    return (
        <>
            <SidePanel token={ token } handleLogout={ handleLogout } setCurrentDisplay={ setCurrentDisplay } DisplayType={ DisplayType } user={ user } setUser={ setUser } />
            { currentDisplay == DisplayType.Profile ? <h1>Profile Page</h1> : null }
            { currentDisplay == DisplayType.Search ? <SearchPage /> : null }
            { currentDisplay == DisplayType.Home ? <h1>Home Page</h1> : null }
        </>
    )
}

export default PostsDisplay