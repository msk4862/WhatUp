import React from 'react'

import './styles/Signup.css'

const Signup = () => {
    return (
        <div className='signup-form-container container'>
            <div className='signup-welcome row justify-content-center'>
                <h2 className='col-10 col-sm-6'>Welcome</h2>
            </div>
            <form className='signup-form row justify-content-center'>
                <div className='col-10 col-sm-6'>
                    <div className="form-group">
                        <label>Email</label>
                        <input type="email" className="form-control" id="email"/>
                    </div>
                    <div className="form-group">
                        <label>Username</label>
                        <input type="text" className="form-control" id="username"/>
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" className="form-control"/>
                    </div>
                    <div className="signup-form button form-group row justify-content-center">
                        <button type="submit" class="btn">Signup</button>
                    </div>
                </div>
                
            </form>    
        </div>
        
    )
}

export default Signup