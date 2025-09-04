import React, { useState } from 'react'
import "../../Main.css"
import LogoutButton from '../LogoutButton/LogoutButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

function SidePanel({ token, handleLogout })
{
    const [openPanel, setOpenPanel] = useState(false);

    function togglePanel()
    {
        setOpenPanel(!openPanel);
    }

    return (
        <>
            <div className={ openPanel ? "panel open" : "panel" }>
                <button class={ openPanel ? "toggle-btn open" : "toggle-btn" } onClick={ togglePanel }>
                    <FontAwesomeIcon icon={faBars} />
                </button>

                <br />
                <div className={ openPanel ? "panel-content open" : "panel-content" }>
                    <h2>Panel</h2>

                    { token ? <LogoutButton onLogout={ handleLogout } /> : null }
                </div>
            </div>
        </>
    )
}

export default SidePanel