import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import { fetchBlog } from '../../actions'
import '../styles/BlogShow.css'

const BlogShow = (props) => {

    // replacement of componentDidMount()
    // empty array is passed as second argument to use it like componentDidMount()
    useEffect(() => {
        const { id } = props.match.params
        props.fetchBlog(id)
    }, [])
    console.log(props)

    return (
        <div className='container-fluid blog-body'>
            <h1 className='blog-title'>{props.blog.Title}</h1>
            <div className='blog-meta row'>
                <span className='col-auto col-sm-auto'><strong>Author</strong></span>
                <span>{props.blog.DateCreated}</span>
            </div>
            <div className='blog-body'>
                <p>{props.blog.Body}</p>
            </div>
        </div>
    )
}
const mapStateToProps = (state, ownProps) => {
    console.log(state.blogs)
    return {blog : state.blogs[ownProps.match.params.id]}
}

export default connect(mapStateToProps, {fetchBlog})(BlogShow)