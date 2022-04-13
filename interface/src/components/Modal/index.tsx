import React from "react";
import { CgClose } from "react-icons/cg";

import { ModalContainer, ModalMessage, ModalInformation } from "./styles";

import { useModal } from "../../providers/ModalProvider";

const Modal = () => {
  const { message, display, type, handleCloseModal } = useModal();
  return (
    <ModalContainer onClick={handleCloseModal} display={display}>
        {
          type !== "Information" ? (
            <ModalMessage id="modal">
              <button onClick={handleCloseModal}>
                <CgClose />
              </button>
              <h3 id="message">{message}</h3>
            </ModalMessage>
          ) : (
            <ModalInformation id="modal">
              <button onClick={handleCloseModal}>
                <CgClose />
              </button>
              <div>{message}</div>
            </ModalInformation>
          )
        }
    </ModalContainer>
  );
};

export default Modal;