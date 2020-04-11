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
        console.log(this.props)
        return this.props.blogs.map ( blog => {
                return <Blog key={blog.id} title={blog.Title} desc={blog.BodyMeta} date={blog.DateCreated}/>
            }
        )
    }

    render() {
        return (
            <div className='container-fluid postlist'>
                {this.renderBlogs()}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {blogs: state.blogs}
}
export default connect(mapStateToProps, {fetchBlogs})(BlogList)