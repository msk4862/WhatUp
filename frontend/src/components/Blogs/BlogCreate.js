import React, { useState } from 'react'


import '../styles/Blogs/BlogCreate.css'
const BlogCreate = (props) => {

    const [title, setTitle] = useState('')
    const [shortDesc, setShortDesc] = useState('')
    const [body, setBody] = useState('')

    function onCreateBlog(event) {
        event.preventDefault()

        const blog = {
            Title: title,
            BodyMeta: shortDesc,
            Body: body,
        }
        console.log(blog)
        // props.login(cred)
    }

    return (
        <form className='blog-create-form' onSubmit={onCreateBlog}>
            <div className='form-group'>
                <label>Title</label>
                <textarea
                    type='textarea'
                    className='form-control'
                    rows='2'
                    required
                    value={title}
                    onChange={(event) => {
                        setTitle(event.target.value)
                    }}
                    >
                </textarea>
            </div>
            <div className='form-group'>
                <lable>Short Description</lable>
                <textarea
                    type='textarea'
                    className='form-control'
                    rows='5'
                    required
                    value={shortDesc}
                    onChange={(event) => {
                        setShortDesc(event.target.value)
                    }}>
                </textarea>
            </div>
            <div className='form-group'>
                <lable>Blog Content</lable>
                <textarea
                    type='textarea'
                    className='form-control'
                    rows='10'
                    required
                    value={body}
                    onChange={(event) => {
                        setBody(event.target.value)
                    }}>
                </textarea>

                <div className="form-group row justify-content-center">
                    <button type="submit" className="btn">Publish Blog</button>
                </div>
            </div>
        </form>
    )
}

export default BlogCreate