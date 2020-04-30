import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import './styles/Login.css'
import { login } from '../actions/index'
import history from '../history'

const Login = (props) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    function onLogin(event) {
        event.preventDefault()
        const cred = {
            email: email,
            password: password
        }
        props.login(cred)
        
    }

    useEffect(()=>{
        //navigating to home if logged in
        if (props.auth.isLoggedIn) {
            history.push('/')
        }
    }, [props.auth])


    return (
        <div className='login-form-container container'>
            <div className='login-welcome row justify-content-center'>
                <h2 className='col-10 col-sm-6'>Welcome Back</h2>
            </div>
            <form className='login-form row justify-content-center' onSubmit={onLogin}>
                <div className='col-8 col-sm-4'>
                    <div className="form-group">
                        <label>Email</label>
                        <input 
                            type="email" 
                            className="form-control" 
                            value={email}
                            onChange={(event) => {
                                event.preventDefault();
                                setEmail(event.target.value)
                            }}
                        />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input 
                            type="password" 
                            className="form-control"
                            value={password}
                            onChange={(event) => {
                                event.preventDefault(); 
                                setPassword(event.target.value)
                            }}
                        />
                    </div>
                    <div className="form-group  row justify-content-center">
                        <button type="submit" className="btn">Login</button>
                    </div>
                </div>
                
            </form>    
        </div>
        
    )
}

const mapStateToProps = (state) => {
    return {auth: state.user.auth}
}

export default connect(mapStateToProps, {login})(Login)