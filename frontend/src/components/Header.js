import React, { useEffect } from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import './styles/Header.css'
import { logout } from '../actions/index'
import history from '../history'

const Header = (props) => {

    function Logout(event) {
        event.preventDefault()
        props.logout()

        // redirect to login page
        history.push('/login')
    }

    function renderUserLinks() {
        return (
            <div className='auth-buttons col-*'>
                    <button className='btn' onClick={Logout}>Logout</button>
            </div>
        )
    }

    function renderGuestLinks() {
        return (
            <div className='auth-buttons col-*'>
                <Link to='/login'><button className='btn'>Login</button></Link>
                <Link to='/signup'><button className='btn'>Signup</button></Link>
            </div>
        )
    }

    return (
        <nav className='navbar navbar-expand-sm row justify-content-between'>
            <h2 className='col-sm-4'><Link to='/'>Blogs</Link></h2>
            {
                props.auth.isLoggedIn? renderUserLinks() : renderGuestLinks()
            }
        </nav>
    )
}


const mapStateToProps = (state) => {
    return {auth: state.user.auth}
}
export default connect(mapStateToProps, {logout})(Header)