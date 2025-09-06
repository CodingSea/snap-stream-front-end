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
                id: res.data.user_id,
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

                    {
                        window.location.href == `${ import.meta.env.VITE_FRONTEND_URL }/snap-stream`
                            ?
                            <>
                                <button onClick={ () => { setCurrentDisplay(DisplayType.Home) } }>Home</button>
                                <button onClick={ () => { setCurrentDisplay(DisplayType.Search) } }>Search</button>
                                <button onClick={ () => { setCurrentDisplay(DisplayType.Profile) } }>Profile</button>
                            </>
                            :
                            <>
                                <button onClick={ () => { navigate("/snap-stream", { state: { displayType: "Home" } }) } }>Home</button>
                                <button onClick={ () => { navigate("/snap-stream", { state: { displayType: "Search" } }) } }>Search</button>
                                <button onClick={ () => { navigate("/snap-stream", { state: { displayType: "Profile" } }) } }>Profile</button>
                            </>
                    }



                    { token ? <LogoutButton onLogout={ handleLogout } /> : null }
                </div>
            </div>
        </>
    )
}

export default SidePanel