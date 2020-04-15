import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import { fetchBlog } from '../../actions'

const BlogShow = (props) => {

    // empty array is passed as second argument to use it like componentDitMount()
    useEffect(() => {
        const { id } = props.match.params
        props.fetchBlog(id)
    }, [])

    return (
        <div className='container-fluid'>
            <h1>{props.blog.Title}</h1>
            <div>
                <p>{props.blog.Body}</p>
            </div>
        </div>
    )
}
const mapStateToProps = (state) => {
    return {blog : state.blogs}
}

export default connect(mapStateToProps, {fetchBlog})(BlogShow)