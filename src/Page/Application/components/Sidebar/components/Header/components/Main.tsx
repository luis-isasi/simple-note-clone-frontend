import * as React from 'react';

import styled from 'styled-components';
import MenuIcon from '@material-ui/icons/Menu';

import { colorIcon } from '../../../../../StylesApp';
import { HoverText } from 'StylesApp';
import { useAppContext } from 'ContextApp/AppContext';

const Main = () => {
  const AppData = useAppContext();

  const onClick = () => {
    //Mostrando Main
    AppData.setMain(true);
  };

  return (
    <BtnMain onClick={onClick}>
      <MenuIcon />
    </BtnMain>
  );
};

const BtnMain = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  ${colorIcon};

  &:hover {
    &:before {
      content: 'Main';
      ${HoverText}
    }
  }
`;
export default React.memo(Main);