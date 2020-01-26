import React from 'react'

import './styles/Post.css'
function Post(props) {

    return (
        <div className='card'>
            <div className='card-body'>
                <h4 className='card-title'>{props.title}</h4>
                <p className='card-text'>{props.desc}</p>
                <a href='#' className='col-sm-3 col-offset-last card-link'>by {props.author}</a>
            </div>
        </div>
    )
}

export default Post