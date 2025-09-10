import React from 'react'
import { Link } from 'react-router-dom'
import "../../Main.css"

function StartingNav()
{
    return (
        <nav className='start-nav'>
            <Link to="/signup">Sign-Up</Link>
            <Link to="/login">Login</Link>
        </nav>
    )
}

export default StartingNav