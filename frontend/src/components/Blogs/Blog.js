import React from 'react'
import { Link } from 'react-router-dom'

import '../styles/Blog.css'

const Blog = (props) => {

    return (
        <div className='card'>
            <div className='card-body'>
                <h4 className='card-title'><Link to={`/blogs/${props.id}`}>{props.title}</Link></h4>
                <p className='card-text'>{props.desc}</p>
                <div className='row justify-content-between align-items-center'>
                    <p className='col-6 col-sm-6 date'>Created on {props.date}</p>                    
                    <div className='col-4 col-sm-4 ml-auto'>
                        <i><span>by </span>
                            <a href='#' className='card-link'>
                                <strong>
                                    {props.firstname} {props.lastname}
                                </strong> 
                            </a>
                        </i>
                    </div>
                    
                </div>
            </div>
        </div>
    )
}

export default Blog