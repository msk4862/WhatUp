import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import './styles/Signup.css'
import { signup, clearAlert } from '../actions'
import history from '../history'
import { SIGNUP_TITLE } from '../utilities/Constants'

const Signup = (props) => {

    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const [password, setPassword] = useState('')
    const [alert, setAlert] = useState('')

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(()=> {
        if (props.auth.isLoggedIn) {
            history.push('/')
        }
        
        if(props.alert.isError) {
            setAlert(props.alert.message)

            // workin as componentWillUnmount(), To clear alert
            return function cleanAlert() {
                props.clearAlert()
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    })


    function Register(event) {
        event.preventDefault()
        const data = {
            email: email,
            username: username,
            first_name: firstname,
            last_name: lastname,
            password: password,
        }
        
        props.signup(data)
    }

    function renderMessage() {
        /*
            rendering info message
        */
        if (alert !== '') {

            const meta = {
                color: 'red',
                symbol: '\u2715'
            }
    
            const style = {
                color: `${meta.color}`,
                border: `2px solid ${meta.color}`
            }
            return (
                <div className='error-message row justify-content-center'>
                    <p className='col-*' style={style}>
                        {meta.symbol} {alert}
                    </p>
                </div>
            )
        } else {
            return null
        }
    }

    return (
        <div className='signup-form-container container'>
            <div className='signup-welcome row justify-content-center'>
                <h2 className='col-10 col-sm-6'>{SIGNUP_TITLE}</h2>
            </div>
            <form className='signup-form row justify-content-center' onSubmit={Register}>
                <div className='col-8 col-sm-8 col-lg-4'>
                  {renderMessage()}  
                    <div className="form-group">
                        <label>Email</label>
                        <input 
                            type="email" 
                            className="form-control" 
                            required
                            value={email}
                            onChange={(event) => {
                                event.preventDefault();
                                setEmail(event.target.value)
                            }}
                        />
                    </div>

                    <div className="form-group">
                        <label>Username</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            required
                            value={username}
                            onChange={(event) => {
                                event.preventDefault();
                                setUsername(event.target.value)
                            }}                            
                        />
                    </div>

                    <div className='row'>
                        <div className="col-6 col-sm-6 form-group">
                            <label>Firstname</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                required
                                value={firstname}
                                onChange={(event) => {
                                    event.preventDefault();
                                    setFirstname(event.target.value)
                                }}                            
                            />
                        </div>
                        <div className="col-6 col-sm-6 form-group">
                            <label>Lastname</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                required
                                value={lastname}
                                onChange={(event) => {
                                    event.preventDefault();
                                    setLastname(event.target.value)
                                }}                            
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input 
                            type="password" 
                            className="form-control"
                            required
                            value={password}
                            onChange={(event) => {
                                event.preventDefault();
                                setPassword(event.target.value)
                            }}                        
                        />
                    </div>
                    <div className="signup-form button form-group row justify-content-center">
                        <button type="submit" className="btn">Signup</button>
                    </div>
                </div>
                
            </form>    
        </div>
        
    )
}

const mapStateToProps = (state) => {
    return {
        auth: state.user.auth,
        alert: state.alert,
    }
}

export default connect(mapStateToProps, {signup, clearAlert})(Signup)