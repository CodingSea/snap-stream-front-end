import React from 'react'
import SidePanel from '../SidePanel/SidePanel'

function SearchPage({ token, handleLogout })
{
    return (
        <>
            <SidePanel token={token} handleLogout={handleLogout} />

            <h1>Main Page</h1>
        </>
    )
}

export default SearchPage