import React from 'react';

import styled, { css } from 'styled-components';
import NotesIcon from '@material-ui/icons/Notes';
import { Link, NavLink } from 'react-router-dom';

import { colorIcon } from 'StylesApp';

const HeaderDesktop = () => {
  return (
    <Header>
      <div>
        <NotesIcon />
        <LinkStyle to="/">SimpleNote</LinkStyle>
      </div>
      <Nav>
        <Navlink
          to="/login"
          activeStyle={{
            fontWeight: 'bold',
            color: `${colorIcon}`,
          }}
        >
          Log in
        </Navlink>
        <b>|</b>
        <Navlink
          to="/register"
          activeStyle={{
            fontWeight: 'bold',
            color: `${colorIcon}`,
          }}
        >
          Sign up
        </Navlink>
      </Nav>
    </Header>
  );
};

const FlexRow = css`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-around;
  align-items: center;
`;

const Header = styled.header`
  height: 56px;
  margin: auto;
  width: 100%;
  max-width: 1200px;
  ${FlexRow}

  div {
    width: 150px;
    ${FlexRow}
  }
`;

const LinkStyle = styled(Link)`
  font-weight: 400;
  font-size: 20px;
  text-decoration: none;
  color: #000000;
`;

const Nav = styled.nav`
  ${FlexRow}
  width: 150px;
  font-weight: 300;

  b {
    font-weight: 100;
    font-size: 34px;
    color: #a9adb1;
  }
`;

const Navlink = styled(NavLink)`
  font-size: 16px;
  cursor: pointer;
  text-decoration: none;
  color: #000000;

  &:hover {
    color: #6e7072;
  }
`;

export default HeaderDesktop;
