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
import {
  cilLockLocked,
  cilUser,
  cilListNumbered,
  cilAddressBook,
  cilBuilding,
  cilFlagAlt,
} from "@coreui/icons";
import { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import axios from "@src/api/axios";
import Cookies from "js-cookie";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
// import useRefreshToken from "../../../@hooks/useRefreshToken";
import FileBase64 from "react-file-base64";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    repeatPassword: "",
    first_name: "",
    last_name: "",
    postcode: "",
    mobile_no: "",
    address_1: "",
    address_2: "",
    company_name: "",
    country: "",
    profile_image: "",
    banner_image: "",
  });
  // const refresh = useRefreshToken();

  // const [imageData, setImageData] = useState(new FormData());
  // console.log(imageData)

  const controller = new AbortController();
  //   const [cookies, setCookie] = useCookies(['jwt']);
  // console.log(formData);
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

    // const form = new FormData();
    // console.log(form)

    // destructure the form data above (useState)
    // const {
    //   username,
    //   email,
    //   password,
    //   repeatPassword,
    //   first_name,
    //   last_name,
    //   postcode,
    //   mobile_no,
    //   address_1,
    //   address_2,
    //   company_name,
    //   country,
    //   profile_image,
    //   banner_image,
    // } = formData;
    // console.log(username)
    // form.append("username", username);
    // form.append("email", email);
    // form.append("password", password);
    // form.append("repeatPassword", repeatPassword);
    // form.append("first_name", first_name);
    // form.append("last_name", last_name);
    // form.append("postcode", postcode);
    // form.append("mobile_no", mobile_no);
    // form.append("address_1", address_1);
    // form.append("address_2", address_2);
    // form.append("company_name", company_name);
    // form.append("country", country);
    // form.append("profile_image", profile_image);
    // form.append("banner_image", banner_image);

    // console.log(form)
    // formData.append("username", username);
    // formData.append("email", email);
    // setImageData((prev) => {
    //   prev.append("profile_image", {});
    //   prev.append("banner_image", {});
    //   return;
    // });

    const form = new FormData();
    // form.append('profile_image', formData.profile_image);
    // form.append('banner_image', formData.banner_image);
      Object.entries(formData).forEach(([name, value]) => {
        form.append(name, value);
      });

    try {
      console.log("sending request");
      const response = await axios.post("/api/users", form, {
        signal: controller.signal,
        credentials: "include",
        withCredentials: true,
        "Content-Type": "multipart/form-data", // Important for file uploads
      });
      console.log(response);
      localStorage.setItem("jwt", response.data.token);
      console.log("set jwt in local storage");
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
        first_name: "",
        last_name: "",
        postcode: "",
        mobile_no: "",
        address_1: "",
        address_2: "",
        company_name: "",
        country: "",
        profile_image: "",
        banner_image: "",
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (event) => {
    const fileInput = event.target;
    if (fileInput.type === "file") console.log(fileInput.files[0]);
    setFormData((prevFormData) => ({
      ...prevFormData,
      [event.target.name]:
        fileInput.type === "file" ? fileInput.files[0] : event.target.value,
    }));
  };

  useEffect(() => {
    const jwtToken = localStorage.getItem("jwt");
    jwtToken ? navigate("/") : null;
  }, []);

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={9} lg={7} xl={6}>
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm onSubmit={handleSubmit} encType="multipart/form-data">
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
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput
                      placeholder="First name"
                      autoComplete="first_name"
                      onChange={handleChange}
                      value={formData.first_name}
                      name="first_name"
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput
                      placeholder="Last name"
                      autoComplete="last_name"
                      onChange={handleChange}
                      value={formData.last_name}
                      name="last_name"
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
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilListNumbered} />
                    </CInputGroupText>
                    <CFormInput
                      placeholder="postcode"
                      autoComplete="postcode"
                      onChange={handleChange}
                      value={formData.postcode}
                      name="postcode"
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilListNumbered} />
                    </CInputGroupText>
                    <CFormInput
                      placeholder="mobile_no"
                      autoComplete="mobile_no"
                      onChange={handleChange}
                      value={formData.mobile_no}
                      name="mobile_no"
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilAddressBook} />
                    </CInputGroupText>
                    <CFormInput
                      placeholder="address_1"
                      autoComplete="address_1"
                      onChange={handleChange}
                      value={formData.address_1}
                      name="address_1"
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilAddressBook} />
                    </CInputGroupText>
                    <CFormInput
                      placeholder="address_2"
                      autoComplete="address_2"
                      onChange={handleChange}
                      value={formData.address_2}
                      name="address_2"
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilBuilding} />
                    </CInputGroupText>
                    <CFormInput
                      placeholder="company_name"
                      autoComplete="company_name"
                      onChange={handleChange}
                      value={formData.company_name}
                      name="company_name"
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilFlagAlt} />
                    </CInputGroupText>
                    <CFormInput
                      placeholder="country"
                      autoComplete="country"
                      onChange={handleChange}
                      value={formData.country}
                      name="country"
                    />
                  </CInputGroup>

                  {/* <CInputGroup className="mb-3">
                    <FileBase64
                      multiple={false}
                      onDone={({ base64 }) => {
                        setFormData((prevFormData) => ({
                          ...prevFormData,
                          profile_image: base64,
                        }));
                      }}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <FileBase64
                      multiple={false}
                      onDone={({ base64 }) => {
                        setFormData((prevFormData) => ({
                          ...prevFormData,
                          banner_image: base64,
                        }));
                      }}
                    />
                  </CInputGroup> */}

                  <CInputGroup className="mb-3">
                    <CInputGroupText
                      component="label"
                      htmlFor="inputGroupFile01"
                    >
                      Profile
                    </CInputGroupText>
                    <CFormInput
                      name="profile_image"
                      // value={formData.profile_name}
                      type="file"
                      id="inputGroupFile01"
                      onChange={handleChange}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText
                      component="label"
                      htmlFor="inputGroupFile02"
                    >
                      Banner
                    </CInputGroupText>
                    <CFormInput
                      name="banner_image"
                      type="file"
                      id="inputGroupFile02"
                      // value={formData.banner_name}
                      onChange={handleChange}
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
