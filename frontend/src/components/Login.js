import React, { useState } from 'react'

import './styles/Login.css'

const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    return (
        <div className='login-form-container container'>
            <div className='login-welcome row justify-content-center'>
                <h2 className='col-10 col-sm-6'>Welcome Back</h2>
            </div>
            <form className='login-form row justify-content-center'>
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
                        <button type="submit" class="btn">Login</button>
                    </div>
                </div>
                
            </form>    
        </div>
        
    )
}

export default Login