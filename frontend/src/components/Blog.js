import React from 'react'

import './styles/Blog.css'
function Blog(props) {

    return (
        <div className='d-flex card'>
            <div className='d-flex flex-column card-body'>
                <h4 className='card-title'>{props.title}</h4>
                <p className='card-text'>{props.desc}</p>
                <div className='d-flex flex-row-reverse'>
                    <i><span>by</span>
                        <a href='#' className='col-sm-3 col-offset-last card-link'>{props.author}</a>
                    </i>
                </div>
            </div>
        </div>
    )
}

export default Blog