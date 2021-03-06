import * as React from 'react';

import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

const LinkLogin = (props) => {
  let history = useHistory();

  const onClick = (event) => {
    event.preventDefault();

    history.push('/login');
  };

  return (
    <A href={props.href} onClick={onClick}>
      {props.children}
    </A>
  );
};

const A = styled.a`
  font-size: 16px;
  cursor: pointer;

  &:hover {
    color: #6e7072;
  }
`;
export default LinkLogin;
