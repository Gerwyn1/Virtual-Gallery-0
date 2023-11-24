import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilLockLocked, cilUser } from "@coreui/icons";
import { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import axios from "@src/api/axios";
import Cookies from "js-cookie";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
// import useRefreshToken from "../../../@hooks/useRefreshToken";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    repeatPassword: "",
  });
  // const refresh = useRefreshToken();

  console.log(Cookies.get("jwt"));

  const controller = new AbortController();
  //   const [cookies, setCookie] = useCookies(['jwt']);
  //   console.log(formData);
  //   console.log('useCookies: ', cookies)

  //   const cookie = Cookies.get('jwt');
  //   console.log(cookie)
  //   console.log(document.cookie);
  //   const allCookies = Cookies.get();
  // console.log(allCookies);

  // useEffect(() => {
  //   // Retrieve the 'jwt' cookie
  //   const jwtCookie = Cookies.get('jwt');

  //   console.log('JWT Cookie:', jwtCookie);
  // }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      console.log('sending request')
      const response = await axios.post("/api/users", formData, {
        signal: controller.signal,
        credentials: "include",
        withCredentials: true,
      });
      console.log(response)
      localStorage.setItem("jwt", response.data.token);
      console.log('set jwt in local storage')
      // Cookies.set("token", response.data.token, {
      //   sameSite: "strict",
      //   path: "/",
      //   expires: new Date(new Date().getTime() + 25 * 1000),
      //   httpOnly: true,
      //   // secure: true,
      // });
      // console.log(Cookies);
      // console.log(Cookies.get("token"));
      // console.log(Cookies.get("token"));
      setFormData({
        username: "",
        email: "",
        password: "",
        repeatPassword: "",
      });
      
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const jwtToken = localStorage.getItem('jwt');
  useEffect(() => {
      jwtToken ? navigate('/') : null; 
  }, [jwtToken])
  

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={9} lg={7} xl={6}>
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm onSubmit={handleSubmit}>
                  <h1>Register</h1>
                  <p className="text-medium-emphasis">Create your account</p>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput
                      placeholder="Username"
                      autoComplete="username"
                      onChange={handleChange}
                      value={formData.username}
                      name="username"
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>@</CInputGroupText>
                    <CFormInput
                      placeholder="Email"
                      autoComplete="email"
                      onChange={handleChange}
                      value={formData.email}
                      name="email"
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="Password"
                      autoComplete="new-password"
                      onChange={handleChange}
                      value={formData.password}
                      name="password"
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-4">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="Repeat password"
                      autoComplete="new-password"
                      onChange={handleChange}
                      value={formData.repeatPassword}
                      name="repeatPassword"
                    />
                  </CInputGroup>
                  <div className="d-grid">
                    <CButton type="submit" color="success">
                      Create Account
                    </CButton>
                  </div>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default Register;
