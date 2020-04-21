import React, {Component} from 'react'
import { connect } from 'react-redux'

import { fetchUser } from '../actions'

class UserHeader extends Component {

    componentDidMount() {
        this.props.fetchUser(this.props.id)
    }

    render() {
        const { user } = this.props
        
        if(!user) {
            return null
        }

        return (
            <div>
                <p><strong>Authored by <i>{user.name}</i></strong></p>
            </div>
        )
    }

}

const mapStateToProps = (state, ownProps) => {
    return {user : state.users.find((user) => user.id === ownProps.id)}
}

export default connect(mapStateToProps, {fetchUser})(UserHeader)