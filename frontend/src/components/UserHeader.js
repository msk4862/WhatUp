import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import { fetchUser } from '../actions'

const UserHeader = (props) => {

    useEffect(() => {
        props.fetchUser(props.author_id)
    // eslint-disable-next-line    
    }, [])

    return (
        <span className='col-auto col-sm-auto'>
            <strong>{`${props.user.first_name} ${props.user.last_name}`} </strong>
        </span>
    )
}

const mapStateToProps = (state) => {
    return {user : state.user.user}
}

export default connect(mapStateToProps, {fetchUser})(UserHeader)
