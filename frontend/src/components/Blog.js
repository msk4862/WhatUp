import React from 'react'

import './styles/Blog.css'
function Blog(props) {

    return (
        <div className='row card'>
            <div className='col-10 col--sm-10 card-body'>
                <h4 className='card-title'>{props.title}</h4>
                <p className='card-text'>{props.desc}</p>
                <div className='row justify-content-between'>
                    <p className='col-sm-3'>Creadted on {props.date}</p>
                    <div className='col-4 col-sm-4 col-offset-last'>
                        <i><span>by</span>
                            <a href='#' className='card-link'> author</a>
                        </i>
                    </div>
                    
                </div>
            </div>
        </div>
    )
}

export default Blog