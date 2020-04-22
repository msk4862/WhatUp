import React, { useState } from 'react'

import './styles/Signup.css'
import DjangoRest from '../apis/DjangoREST'

const Signup = () => {

    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('')
    const [isError, setIsError] = useState(false)

    function Register(event) {
        event.preventDefault()
        const data = {
            email: email,
            username: username,
            first_name: firstname,
            last_name: lastname,
            password: password,
        }
        
        DjangoRest.post('/users/register', data)
        .then(res => {
            if(res.status === 201) {
                setMessage(`Account created successfully. \nNow login to continue`)
                setIsError(false)
            }
        })
        .catch(function (error) {
            if (error.response) {
                setMessage(error.response.data.email)
            } else {
                setMessage(error)
            }
            setIsError(true)
        })
        
    }

    function renderMessage() {
        /*
            rendering info message
        */
        if (message !== '') {

            let color = ''
            let symbol = ''
            if(isError) {
                color = 'red'
                symbol = '\u2715'
            }
            else {
                color = 'green' 
                symbol = '\u2713'
            }
            const style = {
                color: `${color}`,
                border: `2px solid ${color}`
            }
            return (
                <div className='error-message row justify-content-center'>
                    <p className='col-8 col-sm-8' style={style}>
                        {symbol} {message}
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
                <h2 className='col-10 col-sm-6'>Welcome</h2>
            </div>
            <form className='signup-form row justify-content-center' onSubmit={Register}>
                <div className='col-10 col-sm-6'>
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
                        <label>{}</label>
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

export default Signup