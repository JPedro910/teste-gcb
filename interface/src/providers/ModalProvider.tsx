import React, { createContext, useContext } from "react";

import hook from "./hooks/useModal";

type Values = {
  message: any,
  display: string,
  type: string,
  handleShowModal: (message: any, type?: string) => void,
  handleCloseModal: (e: any) => void
}

const defaultValues = {
  display: "",
  message: "",
  type: "",
  handleShowModal: () => "",
  handleCloseModal: () => "",
}

const ModalContext = createContext<Values>(defaultValues);

export const ModalProvider: React.FC = ({ children }) => {
  
  const { message, display, type, handleShowModal, handleCloseModal } = hook();

  return(
    <ModalContext.Provider value={{ message, display, type, handleShowModal, handleCloseModal }}>
      { children }
    </ModalContext.Provider>
  )
}
export const useModal = () => useContext(ModalContext);