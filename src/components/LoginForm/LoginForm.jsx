import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../../../lib/userAPI';
import "../../Login.css";

const LoginPage = ({ onLogin }) =>
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
            navigate('/search');
        }
        catch (error)
        {
            console.log(error);
        }

    }

    return (
        <>
            <div className='background'></div>

            <form onSubmit={ handleSubmit } className='startForm'>
                <h1>Login</h1>

                <label>Username: </label>
                <input
                    placeholder='Username'
                    name='username'
                    value={ credentials.username }
                    onChange={ (e) => setCredentials({ ...credentials, username: e.target.value }) }
                />

                <label>Password: </label>
                <input
                    placeholder='Password'
                    name='password'
                    type='password'
                    value={ credentials.password }
                    onChange={ (e) => setCredentials({ ...credentials, password: e.target.value }) }
                />

                <button type='submit'>Login</button>
                <Link to={"/signup"}><button className='Other'>Sign Up</button></Link>
            </form>
        </>
    );
};

export default LoginPage;