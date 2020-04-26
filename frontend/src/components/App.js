import React from 'react';
import { Router, Route } from 'react-router-dom'

import './styles/App.css'
import Header from './Header'
import Login from './Login'
import Signup from './Signup'
import BlogList from './Blogs/BlogList'
import BlogShow from './Blogs/BlogShow'
import BlogCreate from './Blogs/BlogCreate'
import BlogEdit from './Blogs/BlogEdit'
import history from '../history'

function App() {
  return (
    <div>
      <Router history={history}>
          <div>
            <Header/>
              <div className='container'>
                <Route exact path='/' component={BlogList}/>

                {/* Authentication Routes */}
                <Route exact path='/login' component={Login}/>
                <Route exact path='/signup' component={Signup}/>
                
                {/* Blogs Routes */}
                <Route exact path='/blogs' component={BlogList}/>
                <Route exact path='/blogs/create' component={BlogCreate}/>
                <Route exact path='/blogs/:id' component={BlogShow}/>
                <Route exact path='/blogs/edit/:id' component={BlogEdit}/>
                <Route exact path='/blogs/delete/:id' component={BlogCreate}/>
              </div>
          </div>
      </Router>
    </div>
  )
}

export default App
