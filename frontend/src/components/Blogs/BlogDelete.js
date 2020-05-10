import React from 'react'
import { connect } from 'react-redux'

import '../styles/Blogs/Blog.css'
import Modal from '../Modal'
import { deleteBlog } from '../../actions'
import history from '../../history'

const BlogDelete = (props) => {

    const actions = (
        // to avoid an extra div
        <>
            <button type="button" style={{backgroundColor:'#d63447'}} class="btn">Delete</button>
            <button type="button" style={{backgroundColor:'grey'}} class="btn">Cancel</button>        
        </>
    )

    return (
        <div>
            <h2>Stream Delete</h2>
            <Modal 
                header='Delete Blog'
                content='Are you sure you want to delete this blog?'
                actions={actions}
                onDismiss={() => history.push('/')}
            />
        </div>
    )
}


const mapStateToProps = (state, ownProps) => {
    return { blog: state.blogs[ownProps.match.params.id]}
}

export default connect(mapStateToProps, {deleteBlog})(BlogDelete)
