import React, { useEffect } from 'react'
import {connect} from 'react-redux'

import { fetchBlogs } from '../../actions'
import Blog from './Blog'

import '../styles/BlogList.css'

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
                            />
                }
            )
        } else {
            return <h2>No blogs found!</h2>
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