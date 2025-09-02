import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginForm from "./components/LoginForm/LoginForm"
import SignupForm from './components/SignupForm/SignupForm';
import { jwtDecode } from 'jwt-decode'

function App()
{
  const [token, setToken] = useState(localStorage.getItem('token'));

  function handleLogin(newToken)
  {
    setToken(newToken);
  }

  function handleLogout()
  {
    setToken(null)
    localStorage.removeItem('token')
  }

  if (token)
  {
    const decodedToken = jwtDecode(token)
  }

  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" element={ <LoginForm onLogin={ handleLogin } /> } />
          <Route path="/signup" element={ <SignupForm /> } />
        </Routes>
      </Router>
    </>
  )
}

export default App
