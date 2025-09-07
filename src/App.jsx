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
  const [user, setUser] = useState(
    {
      id: -1,
      username: ""
    }
  )

  function handleLogin(newToken)
  {
    setToken(newToken);
  }

  function handleLogout()
  {
    setToken(null)
    localStorage.removeItem('token')
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
      <Router>
        <Routes>
          <Route path="/login" element={ <LoginForm onLogin={ handleLogin } /> } />
          <Route path="/signup" element={ <SignupForm /> } />

          <Route path='/snap-stream' element={
            <ProtectedRoute>
              <PostsDisplay token={ token } handleLogout={ handleLogout } user={ user } setUser={ setUser } />
            </ProtectedRoute> } />

          <Route path='/post/new' element={
            <ProtectedRoute>
              <SidePanel token={ token } handleLogout={ handleLogout } user={ user } setUser={ setUser } />
              <PostForm />
            </ProtectedRoute> } />

          <Route path='/search/:pk' element={
            <ProtectedRoute>
              <SidePanel token={ token } handleLogout={ handleLogout } user={ user } setUser={ setUser } />
              <PostDetails user={ user } />
            </ProtectedRoute> } />

        </Routes>
      </Router>
    </>
  )
}

export default App
