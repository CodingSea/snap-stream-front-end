import React from 'react'
import SidePanel from '../SidePanel/SidePanel'
import { useNavigate } from 'react-router-dom'

function SearchPage({ token, handleLogout })
{
    const navigate = useNavigate()

    return (
        <>
            <SidePanel token={ token } handleLogout={ handleLogout } />

            <h1>Main Page</h1>
            <button onClick={ () => { navigate('/post/new') } }>+</button>
        </>
    )
}

export default SearchPage