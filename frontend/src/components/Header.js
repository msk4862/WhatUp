import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import "../styles/Header.css";
import { logout } from "../actions/index";
import history from "../history";
import { APP_TITLE } from "../utilities/Constants";

const Header = (props) => {
    function Logout(event) {
        event.preventDefault();
        props.logout();

        // redirect to login page
        history.push("/login");
    }

    function renderUserLinks() {
        return (
            <ul className="navbar-nav my-account">
                <li className="nav-item">
                    <span className="custom-tooltip" data-text="Your notifications">
                        <button className="nav-link">
                            <i className="far fa-bell"></i>
                        </button> 
                    </span>
                </li>

                <li className="nav-item">
                    <Link to="/blogs/new">
                        <span className="custom-tooltip" data-text="Create blog">
                            <button className="nav-link">
                                <i className="fas fa-plus"></i>
                            </button> 
                        </span>
                    </Link>
                </li>

                {/* <!-- Dropdown --> */}
                <li className="nav-item dropdown">
                    <div 
                        className="nav-link dropdown-toggle"
                        id="navbardrop"
                        data-toggle="dropdown">
                        <img className="rounded-circle" src={props.user.credentials.imageUrl} alt="profile"/>
                    </div>
        
                    <div className="dropdown-menu">
                        <Link className="dropdown-item" to={`/user/${props.user.credentials.handle}`}>
                            Profile
                        </Link>
                        <Link className="dropdown-item" to="/blogs/my-blogs">
                            My Blogs
                        </Link>
                        <Link className="dropdown-item" to="" onClick={Logout}>
                            Logout
                        </Link>
                    </div>
                </li>
            </ul>
        );
    }

    function renderGuestLinks() {
        return (
            <ul className="navbar-nav">
                <li className="nav-item">
                    <Link className="nav-link" to="/login">
                        <button className="btn">Login</button>
                    </Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/signup">
                        <button className="btn">Signup</button>
                    </Link>
                </li>
            </ul>
        );
    }

    return (
        <nav className="navbar navbar-expand-sm">
            <Link className="navbar-brand" to="/">
                <h2>{APP_TITLE}</h2>
            </Link>

            {/* Toggler/collapsibe Button */}
            <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#myNavbar"
            >
                <span className="navbar-toggler-icon"></span>
            </button>

            {/* Nav Links */}
            <div className="collapse navbar-collapse" id="myNavbar">
                {props.user.authenticated ? renderUserLinks() : renderGuestLinks()}
            </div>
        </nav>
    );
};

const mapStateToProps = (state) => {
    return { user: state.user };
};
export default connect(mapStateToProps, { logout })(Header);
