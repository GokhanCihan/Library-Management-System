import { useEffect, useRef } from "react";
import { useModal } from "./ModalContext";

export function Modal({message, status, onClose}) {
  const { disappear } = useModal();

  const handleClose = () => {
    disappear();
    if(onClose) {
      onClose();
    }
  }
  return (
    <div className={`modal ${status}`}>
      <div className="modal-message">
        {message}
      </div>
      <div className="modal-footer">
        <button onClick={handleClose}>Close</button>
      </div>
    </div>
  )
}