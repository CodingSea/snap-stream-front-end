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
import PostDetails from './components/PostDetails/PostDetails';
import PostsDisplay from './components/PostsDisplay/PostsDisplay';
import SidePanel from './components/SidePanel/SidePanel';

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

          <Route path='/:displayType' element={
            <ProtectedRoute>
              <SidePanel token={ token } handleLogout={ handleLogout } />
              <PostsDisplay />
            </ProtectedRoute> } />

          <Route path='/post/new' element={
            <ProtectedRoute>
              <SidePanel token={ token } handleLogout={ handleLogout } />
              <PostForm />
            </ProtectedRoute> } />

            <Route path='/search/:pk' element={
            <ProtectedRoute>
              <SidePanel token={ token } handleLogout={ handleLogout } />
              <PostDetails />
            </ProtectedRoute> } />

        </Routes>
      </Router>
    </>
  )
}

export default App
