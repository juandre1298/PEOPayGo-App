'use client';
import {
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
  useState,
} from 'react';
import { Session } from '../service/dto';

type DataType = Session;

interface ContextProps {
  session: DataType | null;
  setSession: Dispatch<SetStateAction<DataType | null>>;
}

const GlobalContext = createContext<ContextProps>({
  session: null, // Align initial value with the type
  setSession: () => null,
});

export const GlobalContextProvider = ({ children }) => {
  const [session, setSession] = useState<DataType | null>(null); // Align initial value with the type

  return (
    <GlobalContext.Provider value={{ session, setSession }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
