import {createContext, useContext, useState} from "react";
import { Modal } from "./Modal";
import "./Modal.styles.css";

const Context = createContext();

export function ModalProvider({children}) {
  const [modal, setModal] = useState(null);

  const alert = (modal) => {
    setModal(modal);
  }

  const disappear = () => {
    setModal(null);
  }

  return (
    <Context.Provider value={
      {
        alert,
        disappear,
      }
    }>
      {children}
      {modal &&
        <div className="modal-container">
          <Modal 
            message={modal.message}
            status={modal.status}
            onClose={modal.onClose} 
          />
        </div>}
    </Context.Provider>
  )
}

export const useModal = () => {
  const value = useContext(Context);
  if(!value) {
    throw new Error("useModal must be used within a ModalProvider")
  }

  return value
}