import React, { useState } from 'react'

import './styles/Signup.css'

const Signup = () => {

    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const [password, setPassword] = useState('')


    return (
        <div className='signup-form-container container'>
            <div className='signup-welcome row justify-content-center'>
                <h2 className='col-10 col-sm-6'>Welcome</h2>
            </div>
            <form className='signup-form row justify-content-center'>
                <div className='col-10 col-sm-6'>

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
                        <label>Username</label>
                        <input 
                            type="text" 
                            className="form-control" 
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
                            value={password}
                            onChange={(event) => {
                                event.preventDefault();
                                setPassword(event.target.value)
                            }}                        
                        />
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