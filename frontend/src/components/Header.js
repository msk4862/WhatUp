import React from 'react';
import { Link } from 'react-router-dom'

import './styles/Header.css'

const Header = () => {
    return (
        <nav className='navbar navbar-expand-sm'>
            <h2><Link to='/'>Blogs</Link></h2>
        </nav>
    )
}

export default Header