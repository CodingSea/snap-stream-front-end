import React, { useEffect, useState } from 'react'
import "../../Main.css"
import LogoutButton from '../LogoutButton/LogoutButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { getUser } from '../../../lib/userAPI';

function SidePanel({ token, handleLogout, setCurrentDisplay, DisplayType, user, setUser })
{
    const [openPanel, setOpenPanel] = useState(false);

    const navigate = useNavigate()

    function togglePanel()
    {
        setOpenPanel(!openPanel);
    }

    async function getCurrentUser()
    {
        try
        {
            const res = await getUser()
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

    useEffect(() =>
    {
        if (user)
        {
            getCurrentUser();
        }
    }, [])

    return (
        <>
            <div className={ openPanel ? "panel open" : "panel" }>
                <button className={ openPanel ? "toggle-btn open" : "toggle-btn" } onClick={ togglePanel }>
                    <FontAwesomeIcon icon={ faBars } />
                </button>

                <div className={ openPanel ? "panel-content open" : "panel-content" }>
                    { user ? <h2>{ user.username }</h2> : null }

                    <button onClick={ () => { navigate(`/home/${ user.id }`) } }>Home</button>
                    <button onClick={ () => { navigate(`/search`, { state: { displayType: "Search" } }) } }>Search</button>
                    <button onClick={ () => { navigate(`/profile/${ user.id }`) } }>Profile</button>


                    { token ? <LogoutButton onLogout={ handleLogout } /> : null }
                </div>
            </div>

            <button onClick={ () => { navigate(-1) } } id='back-btn'>Back</button>
        </>
    )
}

export default SidePanel