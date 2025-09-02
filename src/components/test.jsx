import React, { useEffect, useState } from 'react'
import axios from 'axios'

function test()
{
    const [users, setUsers] = useState([{}]);

    async function listUsers()
    {
        const u = await axios.get("http://127.0.0.1:8000/users/");

        setUsers(u.data);
    }

    useEffect(() =>
    {
        listUsers();
    }, [])

    return (
        <>
            {
                users.map((user, index) => 
                {
                    return (
                        <p key={ index }>{ user.username }</p>
                    )
                })
            }
        </>
    )
}

export default test