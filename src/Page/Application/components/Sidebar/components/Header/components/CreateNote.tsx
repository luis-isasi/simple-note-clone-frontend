import * as React from 'react';

import styled, { css } from 'styled-components';
import PostAddIcon from '@material-ui/icons/PostAdd';
import { useMutation } from '@apollo/client';
import { Shortcuts } from 'shortcuts';
import { useMediaQuery } from 'react-responsive';

import CREATE_NOTE from 'GraphqlApp/CreateNote.graphql';
import GET_NOTES from 'GraphqlApp/GetNotes.graphql';
import NOTE_FRAGMENT from 'GraphqlApp/Fragments/NoteFragment.graphql';
import { HoverText, colorIcon, colorPinned } from 'StylesApp';
import { useAppContext } from 'ContextApp/AppContext';

const CreateNote = ({
  children,
  hover,
  searchGraphqlVariable,
  onClickClear,
}) => {
  const { selectNote, isTrash } = useAppContext();

  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-width: 767px)',
  });

  const shortcuts = new Shortcuts();

  React.useEffect(() => {
    if (isDesktopOrLaptop && !isTrash) {
      shortcuts.add([
        // Adding some shortcuts
        {
          shortcut: 'Ctrl+Shift+L',
          handler: (e) => {
            e.preventDefault();
            onClick();
          },
        },
      ]);
    }

    return () => {
      if (isDesktopOrLaptop) {
        shortcuts.remove([
          {
            shortcut: 'Ctrl+Shift+L',
          },
        ]);
      }
    };
  }, [isTrash]);

  //luego de hacer el mutation debemos de actualizar la cache manuelamente
  const [createNote] = useMutation(CREATE_NOTE, {
    update(cache, { data: { createNote: noteCreated } }) {
      const data = cache.readQuery({
        query: GET_NOTES,
        variables: {
          isInTrash: false,
          text: '',
          tagId: null,
        },
      });
      cache.writeQuery({
        query: GET_NOTES,
        variables: {
          isInTrash: false,
          text: '',
          tagId: null,
        },
        data: {
          notes: [noteCreated, ...data.notes],
        },
      });
      // cache.modify({
      //   fields: {
      //     notes(existingNotes = []) {
      //       const newNoteRef = cache.writeFragment({
      //         data: createNote,
      //         fragment: NOTE_FRAGMENT,
      //       });

      //       return [newNoteRef, ...existingNotes];
      //     },
      //   },
      // });
      selectNote(noteCreated);
    },
    // refetchQueries: [
    //   {
    //     query: GET_NOTES,
    //     variables: {
    // text: '',
    //     },
    //   },
    // ],
  });

  const onClick = () => {
    let _text = searchGraphqlVariable || '';

    createNote({
      variables: {
        text: _text,
      },
    });

    if (onClickClear) onClickClear();
  };

  return (
    <BtnNewNote
      onClick={onClick}
      hover={hover}
      disabled={isTrash}
      id="btn-new-note"
    >
      {children || <PostAddIcon />}
    </BtnNewNote>
  );
};

const hover = css`
  &:hover {
    &:before {
      content: 'New Note';
      ${HoverText};
    }
  }
`;

const BtnNewNote = styled.button.attrs((props) => ({
  id: props.id,
}))`
  background-color: transparent;
  border: none;
  cursor: pointer;
  color: ${colorIcon};

  &:disabled {
    opacity: 0.4;
  }

  > p {
    color: ${colorPinned};
  }

  ${(props) => (props.hover ? hover : null)};
`;

export default CreateNote;
