import React from 'react'
import {connect} from 'react-redux'

import { fetchPosts } from './../actions/'
import Post from './Post'

import './styles/PostList.css'

class PostList extends React.Component {

    componentDidMount() {
        this.props.fetchPosts()
    }

    renderPosts = () => {
        return this.props.posts.map ( post => {
                return <Post key={post.id} title={post.title} desc={post.content} author={post.author}/>
            }
        )
    }

    render() {
        return (
            <div className='col-12 d-flex flex-column postlist'>
                {this.renderPosts()}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {posts: state.posts}
}
export default connect(mapStateToProps, {fetchPosts})(PostList)