import React from 'react';
import { Router, BrowserRouter, Route, Switch } from 'react-router-dom'

import './styles/App.css'
import Header from './Header'
import BlogList from './Blogs/BlogList'
import BlogShow from './Blogs/BlogShow'
import BlogCreate from './Blogs/BlogCreate'
import BlogEdit from './Blogs/BlogEdit'

function App() {
  return (
    <div>
      <BrowserRouter>
          <div>
            <Header/>
            <Switch>
              <div className='container'>
                <Route exact path='/' component={BlogList}/>
                <Route exact path='/blogs/create' component={BlogCreate}/>
                <Route exact path='/blogs/:id' component={BlogShow}/>
                <Route exact path='/blogs/edit/:id' component={BlogEdit}/>
                <Route exact path='/blogs/delete/:id' component={BlogCreate}/>
              </div>
            </Switch>
          </div>
      </BrowserRouter>
    </div>
  )
}

export default App
