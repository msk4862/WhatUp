import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import history from "../history";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import User from "../pages/User";
import BlogEdit from "../pages/BlogEdit";
import BlogShow from "../pages/BlogShow";
import Header from "./Header";
import BlogCreate from "./Blogs/BlogCreate";
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
                                path="/blogs/new"
                                exact
                                component={BlogCreate}
                            />
                            <Route
                                path="/blogs/edit/:id"
                                exact
                                component={BlogEdit}
                            />
                            <Route
                                path="/blogs/:id"
                                exact
                                component={BlogShow}
                            />
                        </Switch>
                    </div>
                </div>
            </Router>
        </div>
    );
}

export default App;
