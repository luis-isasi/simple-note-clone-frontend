import * as React from 'react';

import { useApolloClient, gql } from '@apollo/client';

import { Note, Tag } from 'TypesApp';

type AppState = {
  selectedNote: Note;
  selectNote(selectedNote: Note): void;
  setTextSelectedNote(text: string): void;
  addTagInCurrentNote(tag: Tag): void;
  deleteTagInCurrentNote(tag: Tag): void;
  isAllNotes: boolean;
  setIsAllNotes(isAllNotes: boolean): void;
  isTrash: boolean;
  setIsTrash(isTrash: boolean): void;
  isOpenSidebar: boolean;
  setIsOpenSidebar(isOpenSidebar: boolean): void;
  searchTag: Tag;
  setSearchTag(tag: Tag): void;
  isOpenMain: boolean;
  showMain(show: boolean): void;
  isOpenInfo: boolean;
  showInfo(show: boolean): void;
  isOpenModalShortcuts: boolean;
  setIsOpenModalShortcuts(isOpenModalShortcuts: boolean): void;
};

const AppContext = React.createContext<AppState | undefined>(undefined);

export const AppContextProvider = ({ children }) => {
  const [selectedNote, setSelectedNote] = React.useState(undefined);
  const [isAllNotes, setIsAllNotes] = React.useState(true);
  const [isTrash, setIsTrash] = React.useState(false);
  const [isOpenSidebar, setIsOpenSidebar] = React.useState(true);
  const [searchTag, setSearchTag] = React.useState({
    id: null,
    name: undefined,
  });
  const [isOpenMain, setIsOpenMain] = React.useState(false);
  const [isOpenInfo, setIsOpenInfo] = React.useState(false);

  const [isOpenModalShortcuts, setIsOpenModalShortcuts] = React.useState(false);

  const client = useApolloClient();

  const onClickMain = React.useCallback(() => {
    const _app = document.querySelector('#Application');

    const Main = document.getElementById('main');
    //añadimos las clases para los keyframes
    Main.classList.remove('mainActive');
    Main.classList.add('hidingMain');
    _app.removeEventListener('click', onClickMain);
    setTimeout(() => {
      setIsOpenMain(false);
    }, 200);
  }, []);

  const showMain = (show: boolean) => {
    const app = document.querySelector('#Application');

    //show Main
    if (show) {
      setIsOpenMain(show);
      app.addEventListener('click', onClickMain);
    }

    //function a ejecutar para esconder Main
    if (!show) {
      onClickMain();
    }
  };

  //accedemos a App del DOM y hacemos que esta funcion no se vuelva a crear en cada render
  // asi logramos limpirar el eventListener satisafactoriamente
  const onClickInfo = React.useCallback(() => {
    const _app = document.querySelector('#Application');
    const info = document.querySelector('#info');

    _app.classList.add('hideInfo');
    //añadimos las clases para los keyframes
    info.classList.remove('infoActive');
    info.classList.add('hidingInfo');
    _app.removeEventListener('click', onClickInfo);
    //luego de la animacion desmontamos el componente del dom
    setTimeout(() => {
      setIsOpenInfo(false);
      _app.classList.remove('hideInfo');
    }, 200);
  }, []);

  const showInfo = (show: boolean) => {
    const app = document.querySelector('#Application');

    //ShowInfo
    if (show) {
      setIsOpenInfo(show);
      app.addEventListener('click', onClickInfo);
    }

    //hideInfo
    if (!show) {
      onClickInfo();
    }
  };

  const addTagInCurrentNote = (tag: Tag) => {
    // update the selectedNote from the context

    const existingTags = selectedNote.tags;
    const existing = existingTags.find((_tag) => _tag.name === tag.name);

    //if no existing tag, add the new Tag
    if (!existing) {
      setSelectedNote({
        ...selectedNote,
        tags: [...selectedNote.tags, tag],
      });
    } else {
    }

    // update the cache
    client.cache.modify({
      //le pasamos la nota seleccionada para acceder dentro de ella
      id: client.cache.identify(selectedNote),
      //accedemos a el campo "tags" y creamos una referencia
      fields: {
        tags(existingsTags = []) {
          const newTagRef = client.cache.writeFragment({
            data: tag,
            fragment: gql`
              fragment newTag on Tag {
                id
                name
                notes {
                  id
                  text
                }
              }
            `,
          });
          const existing = existingTags.find((_tag) => _tag.id === tag.id);

          if (existing) {
            return existingTags;
          } else {
            return [...existingsTags, newTagRef];
          }
        },
      },
    });
  };

  const deleteTagInCurrentNote = (tag: Tag) => {
    const tags = selectedNote.tags.filter(
      (currentTag) => currentTag.id !== tag.id
    );
    setSelectedNote({
      ...selectedNote,
      tags,
    });
    client.cache.modify({
      id: client.cache.identify(selectedNote),
      fields: {
        tags(existingstags = []) {
          const tagId = client.cache.identify(tag);

          return existingstags.filter((tag) => tag.__ref !== tagId);
        },
      },
    });
  };

  const selectNote = (selectedNote: Note) => {
    const searchNote = document.querySelector('#InputSearchNote');

    //OBTENEMOS EL TEXTAREA Y LE DAMOS FOCUS,
    const textAreaNote = document.getElementById('textNote');

    if (searchNote) {
      if (!searchNote.value) {
        if (textAreaNote) textAreaNote.focus();
      }
    }
    //SETEAMOS LA NOTA
    setSelectedNote(selectedNote);
  };

  const setTextSelectedNote = (text) => {
    setSelectedNote({ ...selectedNote, text });
  };

  return (
    <AppContext.Provider
      value={{
        selectedNote,
        selectNote,
        setTextSelectedNote,
        addTagInCurrentNote,
        deleteTagInCurrentNote,
        isAllNotes,
        setIsAllNotes,
        isTrash,
        setIsTrash,
        isOpenSidebar,
        setIsOpenSidebar,
        searchTag,
        setSearchTag,
        isOpenMain,
        showMain,
        isOpenInfo,
        showInfo,
        isOpenModalShortcuts,
        setIsOpenModalShortcuts,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const dataApp = React.useContext(AppContext);

  if (dataApp === undefined) {
    throw new Error('useAppContext must be inside AppContextProvider ');
  }
  return dataApp;
};
