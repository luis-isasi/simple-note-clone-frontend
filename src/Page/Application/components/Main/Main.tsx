import * as React from 'react';

import styled from 'styled-components';

// import { useAppContext } from 'ContextApp/AppContext';
import MainOptions from './components/MainOptions';
import Tags from './components/Tags';
import HelperUser from './components/HelperUser';

const Main = ({ className, id }) => {
  return (
    <Div className={className} id={id}>
      <ContentMain>
        <MainOptions />
        <Tags />
        <HelperUser />
      </ContentMain>
    </Div>
  );
};

//-------------style------------
const Div = styled.div.attrs((props) => ({
  className: props.className,
  id: props.id,
}))`
  height: 100%;
  max-height: 100%;
  min-width: 260px;
  max-width: 260px;

  border-right: 1px solid #d6d4d4;
  display: flex;
  flex-direction: column;
`;

const ContentMain = styled.div`
  box-sizing: border-box;
  height: 100%;
  width: 100%;
  padding-top: 56px;
  display: flex;
  flex-direction: column;

  > :nth-child(2) {
    flex-grow: 1;
  }
`;

export default Main;
