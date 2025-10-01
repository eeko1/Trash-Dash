import React, { createContext, useContext, useState } from 'react';

type UserContextType = {
  username: string;
  setUsername: (name: string) => void;
  lang: string;
  setLang: (lang: string) => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [username, setUsername] = useState('');
  const [lang, setLang] = useState('fi'); 
  return (
    <UserContext.Provider value={{ username, setUsername, lang, setLang }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};