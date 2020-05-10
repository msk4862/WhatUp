import React from 'react'
import { createPortal } from 'react-dom'
import history from '../history'

import './styles/Modal.css'

const Modal = (props) => {
    return createPortal(
        <div className='modal-container'
            onClick={()=> history.push('/')}>
            {/* <div className='ui modal active'  
                 onClick={(e) => e.stopPropagation()}
                 style={inlineModalStyles}>
            <div className="header">{props.header}</div>
                <div className="content">
                    {props.content}
                </div>
                <div className='actions'>
                    {props.action}
                </div>
                
            </div> */}
            <div 
                className='modal-content'
                onClick={(e) => e.stopPropagation()}>
                    
                <div className='modal-header'>
                    <h4 class="modal-title">Delete Blog</h4>
                </div>
                <div class="modal-body">
                    <p>Are you sure you want to delete this blog?</p>
                </div>
                <div class="modal-footer">
                    <button type="button" style={{backgroundColor:'#d63447'}} class="btn">Delete</button>
                    <button type="button" style={{backgroundColor:'grey'}} class="btn">Cancel</button>
                </div>

            </div>

        </div>,
        document.getElementById('modal-root')
    )
}

export default Modal