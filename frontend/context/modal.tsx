"use client";

import { createContext, useContext, useState } from "react";

interface Context {
  modalOpen: boolean;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ModalContext = createContext<Context>({
  modalOpen: false,
  setModalOpen: () => {},
});

export const ModalContextProvider = ({ children }) => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <ModalContext.Provider value={{ modalOpen, setModalOpen }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModalContext = () => useContext(ModalContext);
