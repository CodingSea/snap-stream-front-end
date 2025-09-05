import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../../lib/userAPI';

const LoginPage = ({onLogin}) =>
{
    const [credentials, setCredentials] = useState({
        username: '',
        password: '',
    });

    const navigate = useNavigate()
    async function handleSubmit(event)
    {
        event.preventDefault();

        try
        {
            const res = await loginUser(credentials);

            localStorage.setItem('token', res.data.access);
            onLogin(res.data.access);
            navigate('/home');
        }
        catch(error)
        {
            console.log(error);
        }

    }

    return (
        <>
            <h1>Login</h1>

            <form onSubmit={ handleSubmit }>
                <div>
                    <label>Username: </label>
                    <input
                        placeholder='Username'
                        name='username'
                        value={ credentials.username }
                        onChange={ (e) => setCredentials({ ...credentials, username: e.target.value }) }
                    />
                </div>

                <div>
                    <label>Password: </label>
                    <input
                        placeholder='Password'
                        name='password'
                        type='password'
                        value={ credentials.password }
                        onChange={ (e) => setCredentials({ ...credentials, password: e.target.value }) }
                    />
                </div>

                <br />

                <div>
                    <button type='submit'>Login</button>
                </div>
            </form>
        </>
    );
};

export default LoginPage;