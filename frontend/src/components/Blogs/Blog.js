import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import jwt_decode from 'jwt-decode'

import '../styles/Blogs/Blog.css'
import UserHeader from '../UserHeader'
import { connect } from 'react-redux'

const Blog = ({id, title, desc, date, author, auth}) => {
    
    function renderAdmin() {
        const current_user = jwt_decode(auth.token).user_id

        if (current_user === author) {
            return (    
                
                <div className='row justify-content-end'>
                    <Link type='button' className='btn mr-4' to={`/blogs/edit/${id}`}>Edit</Link>
                    <Link style={{backgroundColor:'#d63447'}} type='button' className='btn mr-4' to={`/blogs/delete/${id}`} >Delete</Link>
                </div>
            )
        } else {
            return null
        }
    }

    return (
        <div className='card'>
            <div className='card-body'>
                <h4 className='card-title'><Link to={`/blogs/${id}`}>{title}</Link></h4>
                <p className='card-text'>{desc}</p>
                <div className='row meta-date justify-content-between align-items-center'>
                    <p className='col-6 col-sm-6 date'>Created on {date}</p>                    
                    <div className='col-6 col-sm-6 ml-auto'>
                        <a href='#' className='card-link'>
                            Posted by <UserHeader author_id={author}/>
                        </a>
                    </div>
                </div>
                {auth.isLoggedIn ? renderAdmin() : null}
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {auth: state.user.auth}
}
export default connect(mapStateToProps, {})(Blog)