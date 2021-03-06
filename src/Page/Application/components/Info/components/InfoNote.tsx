import * as React from 'react';

import CloseIcon from '@material-ui/icons/Close';
import styled, { css } from 'styled-components';

import { colorIcon } from 'StylesApp';

const InfoNote = ({ selectedNote, showInfo }) => {
  const { createdAt, updatedAt, text } = selectedNote;

  const finWords = (text) => {
    text = text.trim();
    if (text.charAt(0)) {
      return text.split(' ').length;
    }
    return 0;
  };

  const onClick = () => {
    showInfo(false);
  };

  return (
    <Div>
      <HeadInfo>
        <strong>INFO</strong>
        <Button onClick={onClick}>
          <CloseIcon />
        </Button>
      </HeadInfo>
      <CreateAt>
        <strong>Modified</strong>
        <span>{createdAt}</span>
      </CreateAt>
      <UpdateAt>
        <strong>Last Sync</strong>
        <span>{updatedAt}</span>
      </UpdateAt>
      <div>
        <p>
          {finWords(text)} <strong>words</strong>
        </p>
      </div>
      <div>
        <p>
          {`${text.length} `}
          <strong>characters</strong>
        </p>
      </div>
    </Div>
  );
};

//------------styled-----------
const FlexCol = css`
  display: flex;
  flex-direction: column;
`;

const Div = styled.div`
  box-sizing: border-box;
  padding: 20px;
  width: 100%;
  height: 300px;
  font-family: inherit;
  font-size: 14px;
  font-weight: normal;
  border-bottom: 1px solid ${(props) => props.theme.colorBorder};

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  * {
    font-size: 12px;
    span,
    strong {
      height: 19px;
    }

    span {
      color: #646970;
    }

    p {
      color: ${(props) => props.theme.colorText};
    }

    strong {
      color: ${(props) => props.theme.colorText};
    }
  }
`;

const HeadInfo = styled.div`
  margin: 0px 0px -24px 0px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Button = styled.button`
  color: ${colorIcon} !important;
  cursor: pointer;
  border: none;
  background-color: transparent;
`;
const CreateAt = styled.div`
  ${FlexCol}
`;
const UpdateAt = styled.div`
  ${FlexCol}
`;

export default InfoNote;
