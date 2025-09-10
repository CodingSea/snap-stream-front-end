import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'
import { useNavigate } from 'react-router-dom'

function LogoutButton({ onLogout })
{
    const navigate = useNavigate();

    function handleLogout()
    {
        onLogout()
        navigate("/login")
    }

    return (
        <button onClick={handleLogout}><FontAwesomeIcon icon={faRightFromBracket} /> Logout</button>
    )
}

export default LogoutButton