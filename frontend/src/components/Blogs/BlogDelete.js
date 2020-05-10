import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import '../styles/Blogs/Blog.css'
import Modal from '../Modal'
import { deleteBlog, fetchBlog } from '../../actions'
import history from '../../history'

const BlogDelete = (props) => {

    useEffect(()=> {
        if (!props.auth.isLoggedIn) {
            history.push('/login')
        } 
        props.fetchBlog(props.match.params.id)
    }, [])

    function actions() {
        // to avoid an extra div
        const { id } = props.match.params
        return (
            <>
                <button onClick={()=> props.deleteBlog(id)} style={{backgroundColor:'#d63447'}} className="btn">Delete</button>
                <Link to='/' style={{backgroundColor:'grey'}} className="btn">Cancel</Link>        
            </>
        )
    }

    function renderContent () {
        if(props.blog) {
            return `Are you sure you want to delete the blog with title: ${props.blog.Title}?`
        } else {
            return 'Are you sure you want to delete the blog?'
        }
    }

    return (
        <div>
            <h2>Stream Delete</h2>
            <Modal 
                header='Delete Blog'
                content={renderContent()}
                actions={actions()}
                onDismiss={() => history.push('/')}
            />
        </div>
    )
}


const mapStateToProps = (state, ownProps) => {
    return { 
        auth: state.user.auth,
        blog: state.blogs[ownProps.match.params.id],
    }
}

export default connect(mapStateToProps, { fetchBlog, deleteBlog})(BlogDelete)
