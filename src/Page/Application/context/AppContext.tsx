import * as React from 'react';
import { useApolloClient, gql } from '@apollo/client';

type AppState = {
  note: Note;
  setNote(note: Note): void;
  addTagInCurrentNote(tag: Tag): void;
  deleteTagInCurrentNote(tag: Tag): void;
  sidebar: boolean;
  setSidebar(sidebar: boolean): void;
  main: boolean;
  showMain(): void;
  info: boolean;
  showInfo(show: boolean): void;
};

type Note = {
  id: string;
  text: string;
  user: User;
  createdAt: string;
  updatedAt: string;
  tags: Tag[];
};

type User = {
  id: string;
  email: string;
};

type Tag = {
  id: string;
  name: string;
};

const AppContext = React.createContext<AppState | undefined>(undefined);

export const AppContextProvider = ({ children }) => {
  const [note, setNote] = React.useState(undefined);
  const [sidebar, setSidebar] = React.useState(true);
  const [main, setMain] = React.useState(false);
  const [info, setInfo] = React.useState(false);

  const client = useApolloClient();

  const showMain = () => {
    const app = document.querySelector('#Application');

    //function a ejecutar para esconder Main
    const onClick = () => {
      const Main = document.getElementById('main');
      //añadimos las clases para los keyframes
      Main.classList.remove('mainActive');
      Main.classList.add('mainNoActive');
      app.removeEventListener('click', onClick);
      setTimeout(() => {
        setMain(false);
      }, 200);
    };

    //show Main
    setMain(true);
    app.addEventListener('click', onClick);
  };

  //accedemos a App del DOM y hacemos que esta funcion se memorize
  // asi logramos limpirar el eventListener satisafactoriamente
  const app = document.querySelector('#Application');
  const onClick = React.useCallback(() => {
    const info = document.querySelector('#info');
    //añadimos las clases para los keyframes
    info.classList.remove('infoActive');
    info.classList.add('infoNoActive');
    app.removeEventListener('click', onClick);
    //luego de la animacion desmontamos el componente del dom
    setTimeout(() => {
      setInfo(false);
    }, 200);
  }, [app]);

  const showInfo = (show: boolean) => {
    if (show) {
      setInfo(show);
      app.addEventListener('click', onClick);
    }

    if (!show) {
      onClick();
    }
  };

  const addTagInCurrentNote = (tag: Tag) => {
    // update the note from the  context
    setNote({
      ...note,
      tags: [...note.tags, tag],
    });
    // update the cache
  };

  const deleteTagInCurrentNote = (tag: Tag) => {
    const tags = note.tags.filter((currentTag) => currentTag.id !== tag.id);
    setNote({
      ...note,
      tags,
    });
    client.cache.modify({
      id: client.cache.identify(note),
      fields: {
        tags(existingstags = []) {
          const tagId = client.cache.identify(tag);

          return existingstags.filter((tag) => tag.__ref !== tagId);
        },
      },
    });
  };

  return (
    <AppContext.Provider
      value={{
        note,
        setNote,
        addTagInCurrentNote,
        deleteTagInCurrentNote,
        sidebar,
        setSidebar,
        main,
        showMain,
        info,
        showInfo,
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
