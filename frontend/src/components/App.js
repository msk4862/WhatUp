import React from "react";
import { Router, Route, Switch } from "react-router-dom";

import "../styles/App.css";
import Header from "./Header";
import Login from "./Login";
import Signup from "./Signup";
import BlogList from "./Blogs/BlogList";
import BlogShow from "./Blogs/BlogShow";
import BlogCreate from "./Blogs/BlogCreate";
import BlogEdit from "./Blogs/BlogEdit";
import BlogDelete from "./Blogs/BlogDelete";
import history from "../history";

function App() {
  return (
    <div>
      <Router history={history}>
        <div>
          <Header />
          <div className="container">
            {/* Show only single route at a time (required beacuse /blogs/create=== blogs/:id ) */}
            <Switch>
              <Route exact path="/" component={BlogList} />

              {/* Authentication Routes */}
              <Route exact path="/login" component={Login} />
              <Route exact path="/signup" component={Signup} />

              {/* Blogs Routes */}
              <Route path="/blogs" exact component={BlogList} />
              <Route path="/blogs/my-blogs" exact component={BlogList} />
              <Route path="/blogs/create" exact component={BlogCreate} />
              <Route path="/blogs/edit/:id" exact component={BlogEdit} />
              <Route path="/blogs/delete/:id" exact component={BlogDelete} />
              <Route path="/blogs/:id" exact component={BlogShow} />
            </Switch>
          </div>
        </div>
      </Router>
    </div>
  );
}

export default App;
