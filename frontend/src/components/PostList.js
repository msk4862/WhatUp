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
        return (
            <Post title={'Testing'} desc={'Description'} author={'Author'}/>
        )
    }

    render() {
        return (
            <div className='col-12 postlist'>
                {this.renderPosts()}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    console.log(state)
    return {posts: state.posts}
}
export default connect(mapStateToProps, {fetchPosts})(PostList)