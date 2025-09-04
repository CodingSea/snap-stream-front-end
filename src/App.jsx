import { useEffect, useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import LoginForm from "./components/LoginForm/LoginForm"
import SignupForm from './components/SignupForm/SignupForm';
import { jwtDecode } from 'jwt-decode'
import LogoutButton from './components/LogoutButton/LogoutButton';
import SearchPage from './components/SearchPage/SearchPage';
import PostForm from './components/PostForm/PostForm';

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

  useEffect(() =>
  {
    if (token)
    {
      
    }
  }, [])

  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" element={ <LoginForm onLogin={ handleLogin } /> } />
          <Route path="/signup" element={ <SignupForm /> } />

          <Route path='/home' element={
            <ProtectedRoute>
              <SearchPage token={ token } handleLogout={ handleLogout } />
            </ProtectedRoute> } />

          <Route path='/search' element={
            <ProtectedRoute>
              <SearchPage token={ token } handleLogout={ handleLogout } />
            </ProtectedRoute> } />

          <Route path='/post/new' element={
            <ProtectedRoute>
              <PostForm />
            </ProtectedRoute> } />

        </Routes>
      </Router>
    </>
  )
}

export default App
