import * as React from 'react';
import { useReducer } from 'react';

import { Link } from 'react-router-dom';
import styled from 'styled-components';

import LinkSignup from '../../Components/Header/components/LinkSignup';

const Login = () => {
  return (
    <DivLogin>
      <p>Log In</p>
      <Form>
        <input type="text" />
        <input type="password" />
        <button>Log in</button>
      </Form>
      <div>
        <input type="checkbox"></input>
        <b>Rembember Me</b>
      </div>
      <Link to="/forgot">Forgot you password?</Link>
      <p>
        Don't have an account? <LinkSignup>Sign Up</LinkSignup>{' '}
      </p>
    </DivLogin>
  );
};

const DivLogin = styled.div`
  background-color: skyblue;
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-around;
  align-items: center;
  margin: 150px auto;
  width: 300px;
  height: 400px;

  & > p {
    font-size: 32px;
    font-weight: 500;
  }
`;

const Form = styled.div`
  input {
    box-sizing: border-box;
    width: 100%;
    max-width: 320px;
    height: 38px;
    margin-top: 4px;
    padding: 0px 12px;
    border: solid 1px #e3e0e2;
    border-radius: 5px;
  }

  > :nth-child(3) {
    box-sizing: border-box;
    font-size: 16px;
    width: 100%;
    height: 38px;
    color: #ffffff;
    border: none;
    border-radius: 5px;
    margin: 12px 0px;
    background-color: #3361cc;
  }
`;

export default Login;
