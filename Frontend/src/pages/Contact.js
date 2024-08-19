import React from 'react'

export default function Contact() {
  return (
    <div className='container'>
        <div className='row'>
            <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
                <h2 className='text-center m-4'>Contact</h2>
                <div className='mb-3'>
                    <label htmlFor='Name' className='form-label'>
                        Name
                    </label>
                    <input type={"text"} className='form-control' placeholder='Enter your name'></input>
                </div>
                <div className='mb-3'>
                    <label htmlFor='Email' className='form-label'>
                        Email
                    </label>
                    <input type={"text"} className='form-control' placeholder='Enter your email'></input>
                </div>
                <div className='mb-3'>
                    <label htmlFor='Message' className='form-label'>
                        Message
                    </label>
                    <input type={"text"} className='form-control' placeholder='Enter your message'></input>
                </div>
                <button type="submit" className='btn btn-outline-primary'>Submit</button>
            </div>
        </div>
    </div>
  )
}

