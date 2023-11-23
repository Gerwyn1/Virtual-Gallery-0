import { CFormInput, CInputGroup, CInputGroupText } from "@coreui/react";

const ProfileImageUpload = () => {
  return (
    <CInputGroup className="mb-3">
      <CFormInput type="file" id="inputGroupFile02" />
      <CInputGroupText component="label" htmlFor="inputGroupFile02">
        Upload
      </CInputGroupText>
    </CInputGroup>
  );
};

export default ProfileImageUpload;
