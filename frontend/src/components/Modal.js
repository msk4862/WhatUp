import React from "react";
import { createPortal } from "react-dom";

import "../styles/Modal.css";

const Modal = ({ header, content, actions, onDismiss }) => {
    return createPortal(
        <div className="modal-container" onClick={() => onDismiss()}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h4 className="modal-title">{header}</h4>
                </div>
                <div className="modal-body">
                    <p>{content}</p>
                </div>
                <div className="modal-footer">{actions}</div>
            </div>
        </div>,
        document.getElementById("modal-root")
    );
};

export default Modal;
