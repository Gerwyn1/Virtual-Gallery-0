import { CListGroup, CListGroupItem } from '@coreui/react';
import React from 'react'

const Profile = () => {
  return (
    <></>
  //   <CListGroup>
  //   {Object.entries(user).map(([key, value]) => {
  //     return key === "profile_image" ? (
  //       <CListGroupItem key={key}>
  //         <img
  //           style={{
  //             objectFit: "cover",
  //             width: "100px",
  //             height: "100px",
  //           }}
  //           key={key}
  //           src={`${import.meta.env.VITE_API_URL}/` + value}
  //           alt="profile image"
  //         />
  //       </CListGroupItem>
  //     ) : key === "banner_image" ? (
  //       <CListGroupItem key={key}>
  //         <img
  //           style={{
  //             objectFit: "contain",
  //             width: "100px",
  //             height: "100px",
  //           }}
  //           key={key}
  //           src={`${import.meta.env.VITE_API_URL}/` + value}
  //           alt="banner image"
  //         />
  //       </CListGroupItem>
  //     ) : (
  //       <CListGroupItem key={key}>
  //         {key}: {`${value}`}
  //       </CListGroupItem>
  //     );
  //   })}
  // </CListGroup>
  )
}

export default Profile

{/* <CInputGroup className="mb-3">
<CFormInput type="file" id="inputGroupFile02" />
<CInputGroupText component="label" htmlFor="inputGroupFile02">
  Upload
</CInputGroupText>
</CInputGroup> */}