import React from 'react'
import {connect} from 'react-redux'

import { fetchBlogs } from '../actions'
import Blog from './Blog'

import './styles/BlogList.css'

class BlogList extends React.Component {

    componentDidMount() {
        this.props.fetchBlogs()
    }

    renderBlogs = () => {
        return this.props.blogs.map ( blog => {
                return <Blog key={blog.id} title={blog.title} desc={blog.content} author={blog.author}/>
            }
        )
    }

    render() {
        return (
            <div className='col-12 d-flex flex-column postlist'>
                {this.renderBlogs()}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {blogs: state.blogs}
}
export default connect(mapStateToProps, {fetchBlogs})(BlogList)