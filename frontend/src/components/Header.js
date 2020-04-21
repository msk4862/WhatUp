import React from 'react';
import { Link } from 'react-router-dom'

import './styles/Header.css'

const Header = () => {
    return (
        <nav className='navbar navbar-expand-sm row justify-content-between'>
            <h2 className='col-sm-4'><Link to='/'>Blogs</Link></h2>
            <div className='auth-buttons col-*'>
                <button className='btn'><Link to='/login'>Login</Link></button>
                <button className='btn'><Link to='/signup'>Signup</Link></button>
            </div>
                
        </nav>
    )
}

export default Header