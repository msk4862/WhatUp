import React from 'react'
import { createPortal } from 'react-dom'
import history from '../history'

import './styles/Modal.css'

const Modal = ({header, content, actions, onDismiss}) => {
    return createPortal(
        <div 
            className='modal-container'
            onClick={()=> onDismiss()}
            >
            <div 
                className='modal-content'
                onClick={(e) => e.stopPropagation()}>

                <div className='modal-header'>
                    <h4 class="modal-title">{header}</h4>
                </div>
                <div class="modal-body">
                    <p>{content}</p>
                </div>
                <div class="modal-footer">
                    {actions}
                </div>
            </div>

        </div>,
        document.getElementById('modal-root')
    )
}

export default Modal