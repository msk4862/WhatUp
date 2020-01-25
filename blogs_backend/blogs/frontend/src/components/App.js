import React from 'react';

import Header from './Header'

import './styles/App.css'
import PostList from './PostList'

function App() {
  return (
    <div>
      <Header/>
      <div className='container'>
        <PostList/>
      </div>
    </div>
  )
}

export default App;
