import React from 'react'
import { Link } from 'react-router-dom'

import '../styles/Blogs/Blog.css'
import UserHeader from '../UserHeader'

const Blog = ({id, title, desc, date, author}) => {

    return (
        <div className='card'>
            <div className='card-body'>
                <h4 className='card-title'><Link to={`/blogs/${id}`}>{title}</Link></h4>
                <p className='card-text'>{desc}</p>
                <div className='row meta-date justify-content-between align-items-center'>
                    <p className='col-6 col-sm-6 date'>Created on {date}</p>                    
                    <div className='col-4 col-sm-4 ml-auto'>
                        <i><span>by </span>
                            <a href='#' className='card-link'>
                                <UserHeader author_id={author}/>
                            </a>
                        </i>
                    </div>
                    
                </div>
            </div>
        </div>
    )
}

export default Blog