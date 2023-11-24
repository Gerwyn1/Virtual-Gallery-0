import React, {useState, useEffect} from 'react'
import { AppContent, AppSidebar, AppFooter, AppHeader } from '@components/index'
import { useNavigate } from 'react-router-dom'
// import Cookies from 'js-cookie'
// import {Redirect} from 'react-router-dom'
// import { useCookies } from 'react-cookie'
import { isAuthenticated } from '../auth/auth'
import * as jwtDecode from 'jwt-decode'
import axios from 'axios';

const DefaultLayout = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('jwt');
  const [user, setUser] = useState(null)
  
  useEffect(() => {
    async function fetchData() {
      if (!isAuthenticated()) {
        // Redirect to the login page or another route
        // return <Navigate to="/login" />
        navigate('/login');
      } else {
        // { headers: { Authorization: `Bearer ${token}` } }
        const userExists = await axios.get(`/api/users/profile`, {
          userId : jwtDecode.jwtDecode(token).userId,
        });
        console.log('does user exist?')
        console.log(userExists)
  
        if (userExists) {
          setUser(userExists);
        }
      }
    }
    fetchData();

   
  }, [navigate, token]);

  console.log(user)

  return (
    <div>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <AppHeader />
        <div className="body flex-grow-1 px-3">
          <AppContent />
        </div>
        <AppFooter />
      </div>
    </div>
  )
}

export default DefaultLayout
