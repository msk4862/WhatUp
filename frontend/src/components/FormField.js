import React from 'react'

const FormField = (props) => {
    return (
        <div className="form-group">
            <label>Email</label>
            <input 
                type={props.type}
                className="form-control" 
                value={props.value}
                onChange={(event) => props.onChange(event)}
            />
        </div>
    )
}

export default FormField