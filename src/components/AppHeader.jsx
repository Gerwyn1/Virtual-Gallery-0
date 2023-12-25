import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  CContainer,
  CHeader,
  CHeaderBrand,
  CHeaderDivider,
  CHeaderNav,
  CHeaderToggler,
  CNavLink,
  CNavItem,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilBell, cilEnvelopeOpen, cilList, cilMenu } from "@coreui/icons";

import { AppBreadcrumb } from "./index";
import { AppHeaderDropdown } from "./header/index";
import { logo } from "../assets/brand/logo";

// eslint-disable-next-line react/prop-types
const AppHeader = ({ user }) => {
  const dispatch = useDispatch();
  // const sidebarShow = useSelector((state) => state.sidebarShow);

  return (
    <CHeader position="sticky" className="mb-4">
      <CContainer>
        <CHeaderToggler
          className="ps-1"
          // onClick={() => dispatch({ type: "set", sidebarShow: !sidebarShow })}
        >
          <CIcon icon={cilMenu} size="lg" />
        </CHeaderToggler>
        <CHeaderBrand className="mx-auto d-md-none" to="/">
          <CIcon icon={logo} height={48} alt="Logo" />
        </CHeaderBrand>
        {/* 3 TEXTS */}
        <CHeaderNav className="d-none d-md-flex me-auto">
          <CNavItem>
            <CNavLink to="/dashboard" component={NavLink}>
              Dashboard
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink href="/users">Users</CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink href="/settings">Settings</CNavLink>
          </CNavItem>
        </CHeaderNav>
        {/* 3 ICONS - BELL, LIST, MAIL */}
        <CHeaderNav>
          <CNavItem>
            <CNavLink href="/notifications">
              <CIcon icon={cilBell} size="lg" />
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink href="#">
              <CIcon icon={cilList} size="lg" />
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink href="#">
              <CIcon icon={cilEnvelopeOpen} size="lg" />
            </CNavLink>
          </CNavItem>
        </CHeaderNav>
        {/* PROFILE */}
        <CHeaderNav className="ms-3">
          <AppHeaderDropdown user={user} />
        </CHeaderNav>
      </CContainer>
      <CHeaderDivider />
      <CContainer>
        <AppBreadcrumb />
      </CContainer>
    </CHeader>
  );
};

export default AppHeader;
