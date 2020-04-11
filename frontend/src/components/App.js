import React from 'react';

import Header from './Header'

import './styles/App.css'
import BlogList from './BlogList'

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
