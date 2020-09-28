import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import history from "../history";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import User from "../pages/User";
import PostEdit from "../pages/PostEdit";
import PostShow from "../pages/PostShow";
import Header from "./Header";
import PostCreate from "../pages/PostCreate";
import ProtectedRoute from "./ProtectedRoute";
import "../styles/base.css";

function App() {
    return (
        <div>
            <Router history={history}>
                <div>
                    <Header />
                    <div className="container-fluid">
                        {/* Show only single route at a time (required beacuse /blogs/create=== blogs/:id ) */}
                        <Switch>
                            <Route exact path="/" component={Home} />

                            {/* Authentication Routes */}
                            <Route exact path="/login" component={Login} />
                            <Route exact path="/signup" component={Signup} />

                            <Route
                                exact
                                path="/user/:handle"
                                component={User}
                            />

                            {/* Blogs Routes */}
                            <ProtectedRoute
                                path="/posts/new"
                                exact
                                component={PostCreate}
                            />
                            <ProtectedRoute
                                path="/posts/edit/:id"
                                exact
                                component={PostEdit}
                            />
                            <Route
                                path="/posts/:id"
                                exact
                                component={PostShow}
                            />
                        </Switch>
                    </div>
                </div>
            </Router>
        </div>
    );
}

export default App;
