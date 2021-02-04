import * as React from 'react';

import styled from 'styled-components';
import AttachFileIcon from '@material-ui/icons/AttachFile';

import CreateNote from '../Header/components/CreateNote';
import { colorIcon, colorBorder } from 'StylesApp';

const ListNotes = ({
  filterNotes: { listNotes, lengthPinned },
  note,
  selectNote,
  searchGraphqlVariable,
  onClickClear,
  trash,
}) => {
  const noteSelectedId = note ? note.id : '';
  const indexNote = React.useRef(0);
  const listNoteLength = React.useRef(listNotes.length);

  // console.log({ listNotes });

  React.useEffect(() => {
    // Asigamos la primera nota
    selectNote(listNotes[indexNote.current]);
  }, []);

  React.useEffect(() => {
    const newNotesLength = listNotes.length;
    const oldNotesLength = listNoteLength.current;

    //DELETE LAST NOTE
    if (oldNotesLength > newNotesLength) {
      listNoteLength.current = newNotesLength;
      let index = indexNote.current;

      if (newNotesLength === index) {
        selectNote(listNotes[indexNote.current - 1]);
        indexNote.current = index - 1;
      } else {
        selectNote(listNotes[indexNote.current]);
      }
    }

    //ADDING NEW NOTE
    if (oldNotesLength < newNotesLength) {
      listNoteLength.current = newNotesLength;
      indexNote.current = lengthPinned;
      selectNote(listNotes[indexNote.current]);
    }
  }, [listNotes]);

  const renderNotes = () => {
    //SE REALIZO UNA BUSQUEDAD PERO NO HAY RESULTADOS, DAMOS LA OPCION DE CREAR UNO CON EL VALUE SEARCH
    if (searchGraphqlVariable && !listNotes.length) {
      return (
        <DivNoNotes>
          <div>
            <NoNotes>No Results</NoNotes>
            <CreateNote
              hover={false}
              searchGraphqlVariable={searchGraphqlVariable}
              onClickClear={onClickClear}
            >
              {`Create a new note with "${searchGraphqlVariable}"`}
            </CreateNote>
          </div>
        </DivNoNotes>
      );
    }

    //si no hay Notas a renderizar le avisamos y le damos la opcion de crear una
    if (!listNotes.length) {
      return (
        <DivNoNotes>
          <div>
            <NoNotes>No Notes</NoNotes>
            <CreateNote hover={false}>Create a new note</CreateNote>
          </div>
        </DivNoNotes>
      );
    }

    //renderizamos todas las notas
    return listNotes.map((_note, index) => (
      <BtnNote
        key={_note.id}
        onClick={() => {
          indexNote.current = index;
          selectNote(_note);
        }}
        selected={_note.id === noteSelectedId}
      >
        <div className="pinned">{_note.pinned && <AttachFileIcon />}</div>
        <div className="noteText">
          <p>{_note.text || <NewNote>New Note...</NewNote>}</p>
        </div>
      </BtnNote>
    ));
  };

  return (
    <>
      <Ul>{renderNotes()}</Ul>
      {trash && <BtnEmptyTrash>Empty Trash</BtnEmptyTrash>}
    </>
  );
};

//----------Styles----------

const Ul = styled.ul`
  width: 100%;
  display: flex;
  flex-flow: column;
  overflow: auto;

  &::-webkit-scrollbar {
    /* -webkit-appearance: none; */
    width: 12px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #c2c1c1;
    border-radius: 10px;
    border: 3px solid #ffffff;
  }
`;

const BtnNote = styled.button`
  cursor: pointer;
  border: none;
  height: 64px;
  width: 100%;
  padding: 0px;
  background-color: ${(props) => (props.selected ? '#cfddfd' : 'transparent')};
  display: flex;
  flex-flow: row;
  justify-content: space-between;
  align-items: flex-start;

  .pinned {
    background-color: transparent;
    color: ${colorIcon};
    margin-top: 4px;
    margin-left: 4px;
    > * {
      transform: rotate(45deg);
      font-size: 18px;
    }
  }

  .noteText {
    box-sizing: border-box;
    background-color: transparent !important;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 90%;
    border-bottom: 1px solid #c3c4c7;

    p {
      width: 100%;
      font-family: inherit;
      font-size: 16px;
      font-weight: 300;
      text-align: left;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }
  }
`;

const NewNote = styled.strong`
  color: #918f90;
`;

const DivNoNotes = styled.div`
  margin: auto;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;

  > div {
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
  }
`;

const NoNotes = styled.p`
  font-family: inherit;
  font-size: 22px;
  font-weight: 300;
`;

const BtnEmptyTrash = styled.button`
  background-color: transparent;
  height: 58px;
  width: 100%;
  color: #e65054;
  border: none;
  font-family: inherit;
  font-weight: 500;
  cursor: pointer;
  border-top: 1px solid ${colorBorder};
`;

export default React.memo(ListNotes);
