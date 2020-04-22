import React from 'react';
import { Link } from 'react-router-dom'

import './styles/Header.css'

const Header = () => {
    return (
        <nav className='navbar navbar-expand-sm row justify-content-between'>
            <h2 className='col-sm-4'><Link to='/'>Blogs</Link></h2>
            <div className='auth-buttons col-*'>
                <Link to='/login'><button className='btn'>Login</button></Link>
                <Link to='/signup'><button className='btn'>Signup</button></Link>
            </div>
                
        </nav>
    )
}

export default Header