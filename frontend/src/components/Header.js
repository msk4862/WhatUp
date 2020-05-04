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
            <ul className='navbar-nav auth-buttons'>
                <li className="nav-item">
                    <button className='btn nav-link' onClick={Logout}>Logout</button>
                </li>
            </ul>
        )
    }

    function renderGuestLinks() {
        return (
            <ul className="navbar-nav auth-buttons">
                <li className="nav-item">
                    <Link className="nav-link" to='/login'><button className='btn'>Login</button></Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to='/signup'><button className='btn'>Signup</button></Link>
                </li>
            </ul>
        )
    }

    return (
        <nav className="navbar navbar-expand-sm">
                <Link className="navbar-brand" href="#">Blogs</Link>
                
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#myNavbar">
                        <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="myNavbar">
                {
                    props.auth.isLoggedIn? renderUserLinks() : renderGuestLinks()
                }
                </div>
            </nav>

    )
}


const mapStateToProps = (state) => {
    return {auth: state.user.auth}
}
export default connect(mapStateToProps, {logout})(Header)