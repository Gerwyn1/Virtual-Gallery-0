import React, { useState, useEffect, useCallback, useMemo } from "react";
import {
  AppContent,
  AppSidebar,
  AppFooter,
  AppHeader,
} from "@components/index";
import { useNavigate } from "react-router-dom";
// import Cookies from 'js-cookie'
// import {Redirect} from 'react-router-dom'
// import { useCookies } from 'react-cookie'
import { isAuthenticated } from "../auth/auth";
import * as jwtDecodeLib from "jwt-decode";
import axios from "axios";

const DefaultLayout = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  
  
  useEffect(() => {
    async function fetchData() {
      if (!isAuthenticated()) {
        // Redirect to the login page or another route
        // return <Navigate to="/login" />
        navigate("/login");
      }
      // else {
        //   // { headers: { Authorization: `Bearer ${token}` } }
        const token = localStorage.getItem("jwt");
        const userId = jwtDecodeLib.jwtDecode(token).userId;
        const userExists = await axios.get(`/api/users/profile/${userId}`);
        if (userExists) {
          setUser(() => userExists.data);
        }
      //   const userExists = await axios.get(`/api/users/profile/${userId}`);
      //   console.log("authenticated user");
      //   console.log("does user exist?");
      //   console.log(userExists);

      //   if (userExists) {
      //     setUser(userExists.data);
      //   }
      // }
    }
    fetchData();
  }, [navigate]);

  console.log(user);

  return (
    <div>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <AppHeader />
        <div className="body flex-grow-1 px-3">
          {
            <ul>
              {Object.entries(user).map(([key, value]) => {
                console.log(key,value)
                return  key === "profile_image" ? (
                  <img style={{objectFit:'cover', width:'100px', height: '100px'}} key={key} src={`${import.meta.env.VITE_API_URL}/` + value} alt="profile image" />
                ) : key === "banner_image" ? (
                  <img style={{objectFit:'cover', width:'300px', height: '100px'}} key={key} src={`${import.meta.env.VITE_API_URL}/` + value} alt="banner image" />
                ) : (
                  <li key={key}>
                    {key}: {`${value}`}
                  </li>
                );
              })}
            </ul>
          }
          <AppContent />
        </div>
        <AppFooter />
      </div>
    </div>
  );
};

export default DefaultLayout;
