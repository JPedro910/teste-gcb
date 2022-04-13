import { useState } from "react";

const useModal = (): any => {
  const [display, setDisplay] = useState<string>("none");
  const [message, setMessage] = useState<any>("");
  const [type, setType] = useState<string>("");

  const handleShowModal = (message: any, type?: string) => {
    setType(type || "");
    setMessage(message);
    setDisplay("flex");
  }

  const handleCloseModal = (e: any) => {
    if (e.target.id !== "message" && e.target.accessKey !== "li") {
      setDisplay("none");
      setType("");
    }
  }

  return { message, display, type, handleShowModal, handleCloseModal };
}

export default useModal;