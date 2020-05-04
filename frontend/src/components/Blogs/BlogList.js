import React, { useEffect } from 'react'
import {connect} from 'react-redux'

import { fetchBlogs } from '../../actions'
import Blog from './Blog'

import '../styles/Blogs/BlogList.css'

const BlogList = (props) => {

    useEffect(() => {
        props.fetchBlogs()
    }, [])

    function renderBlogs() {
        if(props.blogs) {
            return props.blogs.map (blog => {
                    return <Blog 
                                key={blog.id} 
                                id={blog.id}
                                title={blog.Title} 
                                desc={blog.BodyMeta} 
                                date={blog.DateCreated}
                                firstname={blog.Author.user.first_name}
                                lastname={blog.Author.user.last_name}
                            />
                }
            )
        } else {
            return <h2>Sorry! No blogs yet written.</h2>
        }
    }

    return (
        <div className='container-fluid postlist'>
            {renderBlogs()}
        </div>
    )
}

const mapStateToProps = (state) => {
    return {blogs: Object.values(state.blogs)}
}
export default connect(mapStateToProps, {fetchBlogs})(BlogList)