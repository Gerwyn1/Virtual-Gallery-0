import React, { useState, Suspense } from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import "./scss/style.scss";
import Loading from "@src/views/pages/GalleryLoading.jsx";
import AuthApi from "./auth/AuthApi";
// import ProtectedRoute from './components/ProtectedRoute'
import ProfileImageUpload from "./views/pages/ProfileImageUpload";
// import jwt from 'jsonwebtoken';

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
);

// Containers
const DefaultLayout = React.lazy(() => import("@layout/DefaultLayout"));

// Pages
const Login = React.lazy(() => import("@views/pages/login/Login"));
const Register = React.lazy(() => import("@views/pages/register/Register"));
const Page404 = React.lazy(() => import("@views/pages/page404/Page404"));
const Page500 = React.lazy(() => import("@views/pages/page500/Page500"));

const App = () => {
  const [auth, setAuth] = useState(false);
  // console.log(document.cookie
  //   .split('; '))
  // const jwtToken = Cookies.get("jwt");
  // console.log(jwtToken);



  // if (jwtToken) {
  //   try {
  //     // Decode the JWT token
  //     const decodedToken = jwt.decode(jwtToken);

  //     // Check if the token has an expiration time
  //     if (decodedToken && decodedToken.exp) {
  //       // Get the current timestamp
  //       const currentTimestamp = Math.floor(Date.now() / 1000);

  //       // Check if the token has expired
  //       if (decodedToken.exp < currentTimestamp) {
  //         // Token has expired
  //         console.log("JWT Token has expired");
  //       } else {
  //         // Token is still valid
  //         console.log("JWT Token is still valid");
  //       }
  //     } else {
  //       // Token does not have an expiration time
  //       console.log("JWT Token does not have an expiration time");
  //     }
  //   } catch (error) {
  //     console.error("Error decoding JWT token:", error);
  //   }
  // } else {
  //   // Token not found in the cookie
  //   console.log("JWT Token not found");
  // }

  return (
    <AuthApi.Provider value={{ auth, setAuth }}>
      <BrowserRouter>
        <Suspense fallback={loading}>
          <Routes>
            <Route path="/login" name="Login Page" element={<Login />} />
            <Route
              path="/register"
              name="Register Page"
              element={<Register />}
            />
            <Route path="/404" name="Page 404" element={<Page404 />} />
            <Route path="/500" name="Page 500" element={<Page500 />} />
            <Route path="/gallery" name="Gallery" element={<Loading />} />
            <Route path="/profile-upload" name="Profile Upload" element={<ProfileImageUpload />} />
            <Route
              path="*"
              name="Home"
              element={<DefaultLayout />}
            />
            {/* <Route
              path="*"
              name="Home"
              element={'hello world'}
              // auth={auth}
            /> */}
          </Routes>
        </Suspense>
      </BrowserRouter>
    </AuthApi.Provider>
  );
};

export default App;
