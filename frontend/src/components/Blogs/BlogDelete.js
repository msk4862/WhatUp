import React from 'react'
import { Link } from 'react-router-dom'

import '../styles/Blogs/Blog.css'
import Modal from '../Modal'
import { deleteBlog } from '../../actions'
import history from '../../history'

const BlogDelete = (props) => {

    return (
        <div>
            <h2>Stream Delete</h2>
            {/* <Modal header='Delete Stream'
                    content={renderContent()}
                    action= {renderAction()}
                    onDismiss={() => history.push('/')}
            /> */}
            <Modal />
        </div>
    )
}


// const mapStateToProps = (state, ownProps) => {
//     return { blog: state.blogs[ownProps.match.params.id]}
// }

// export default connect(mapStateToProps, {BlogDelete})(BlogDelete)
export default BlogDelete