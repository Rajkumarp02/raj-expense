import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { forgetPw } from '../Action/auth';

export default function Forget() {
  const [email, setEmail] = useState('');//useremail
  const dispatch = useDispatch();

//submit func
  const handleSubmit = (e) => {
    e.preventDefault()
    if (email) {
      dispatch(forgetPw({ email }));
    }
    setEmail("")
  }
  return (
    <div className='auth'>
      <div className='container sm'>
        <h2>Forget-Password-Form</h2>
        <form className="was-validated" onSubmit={(e) => handleSubmit(e)}>

          <label for="validationCustom01" class="form-label">Email</label>
          <input type='email' name='email' class="form-control" id="validationCustom01" value={email} placeholder='Enter your email' onChange={(e) => setEmail(e.target.value)} required />
          <div class="invalid-feedback">
            <p>Please Enter Email</p>
          </div>
          <button type='submit'>Submit</button>
        </form>
      </div>
    </div>
  )
}
