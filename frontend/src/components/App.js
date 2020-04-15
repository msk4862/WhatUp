import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import './styles/App.css'
import Header from './Header'
import BlogList from './BlogList'
import BlogCreate from './BlogCreate'

function App() {
  return (
    <div>
      <Header/>
      <BrowserRouter>
          <div className='container'>
            <Switch>
              <Route exact path='/' component={BlogList}/>
              <Route path='/create' component={BlogCreate}/>
            </Switch>
          </div>
      </BrowserRouter>
    </div>
  )
}

export default App
