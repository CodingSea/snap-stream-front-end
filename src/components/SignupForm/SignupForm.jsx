import { useState } from 'react'
import { useNavigate } from 'react-router'
import axios from 'axios'

function SignupForm()
{
    const [formData, setFormData] = useState
        (
            {
                username: "",
                password: ""
            }
        )
    const navigate = useNavigate()

    function handleChange(event)
    {
        setFormData({ ...formData, [event.target.name]: event.target.value })
    }

    async function handleSubmit(event)
    {
        event.preventDefault()
        try
        {
            await axios.post(`${ import.meta.env.VITE_BACKEND_URL }/signup/`, 
                {
                    username: formData.username,
                    password: formData.password
                }
            )

            navigate('/login')
        } catch (error)
        {
            console.log(error)
        }
    }

    return (
        <form onSubmit={ handleSubmit }>
            <h2>Sign Up</h2>
            <label htmlFor="username">Username: </label>
            <input 
                name='username'
                placeholder="Username"
                value={ formData.username }
                onChange={ handleChange }
            />

            <label htmlFor="password">Password: </label>
            <input
                name='password'
                placeholder="Password"
                type="password"
                value={ formData.password }
                onChange={ handleChange }
            />
            <button type="submit">Sign Up</button>
        </form>
    )
}
export default SignupForm