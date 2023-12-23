import React, { useState, useEffect, useCallback, useMemo } from "react";
import {
  AppContent,
  AppSidebar,
  AppFooter,
  AppHeader,
} from "@components/index";
import { useNavigate, useParams, useLocation } from "react-router-dom";
// import Cookies from 'js-cookie'
// import {Redirect} from 'react-router-dom'
// import { useCookies } from 'react-cookie'
import { isAuthenticated } from "../auth/auth";
import * as jwtDecodeLib from "jwt-decode";
import axios from "axios";
import { CListGroup, CListGroupItem } from "@coreui/react";

const DefaultLayout = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({});

  useEffect(() => {
    async function fetchData() {
      if (!isAuthenticated()) {
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

  const location = useLocation();
  const currentPath = location.pathname; // comes after the root url

  return (
    <div>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <AppHeader user={user} />
        <div className="body flex-grow-1 px-3">
          {currentPath.endsWith("profile") ? (
            <CListGroup>
              {Object.entries(user).map(([key, value]) => {
                return key === "profile_image" ? (
                  <CListGroupItem key={key}>
                    <img
                      style={{
                        objectFit: "cover",
                        width: "100px",
                        height: "100px",
                      }}
                      key={key}
                      src={`${import.meta.env.VITE_API_URL}/` + value}
                      alt="profile image"
                    />
                  </CListGroupItem>
                ) : key === "banner_image" ? (
                  <CListGroupItem key={key}>
                    <img
                      style={{
                        objectFit: "contain",
                        width: "100px",
                        height: "100px",
                      }}
                      key={key}
                      src={`${import.meta.env.VITE_API_URL}/` + value}
                      alt="banner image"
                    />
                  </CListGroupItem>
                ) : (
                  <CListGroupItem key={key}>
                    {key}: {`${value}`}
                  </CListGroupItem>
                );
              })}
            </CListGroup>
          ) : (
            <AppContent />
          )}
        </div>
        <AppFooter />
      </div>
    </div>
  );
};

export default DefaultLayout;
