import React from 'react';
// import { Router, Link } from 'react-router-dom'

import './styles/App.css'
import BlogList from './BlogList'
import Header from './Header'

function App() {
  return (
    <div>
      <Header/>
      <div className='container'>
        <BlogList/>
      </div>
    </div>
  )
}

export default App;
