import "@fortawesome/fontawesome-free/css/all.min.css";
import React from "react";
import { Route, Router, Switch } from "react-router-dom";
import history from "../history";
import Home from "../pages/Home";
import Login from "../pages/Login";
import PostCreate from "../pages/PostCreate";
import PostEdit from "../pages/PostEdit";
import PostShow from "../pages/PostShow";
import Signup from "../pages/Signup";
import User from "../pages/User";
import "../styles/base.css";
import Header from "./Header";
import OverlayLoader from "./OverlayLoader";
import ProtectedRoute from "./ProtectedRoute";

function App() {
    return (
        <div>
            <OverlayLoader />
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
                            <Route
                                path="*"
                                component={() => <h2>404 not found</h2>}
                            />
                        </Switch>
                    </div>
                </div>
            </Router>
        </div>
    );
}

export default App;
