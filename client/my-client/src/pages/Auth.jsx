import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import './Auth.css'
import { useDispatch } from 'react-redux';
import { sign_up, login } from '../Action/auth';
import { Link, useNavigate } from 'react-router-dom';




export default function Auth() {

  const [name, setName] = useState('');//username
  const [email, setEmail] = useState('');//useremail
  const [password, setPassword] = useState('');//userpassword
  const [errors, setErrors] = useState({});//errors obj

  const [loading, setLoading] = useState(false)
  const [signup, setSignup] = useState(false);



  const dispatch = useDispatch();
  const nav = useNavigate();


  //validation 
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    let error = '';
    const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
    const isValid = specialCharRegex.test(value);

    if (name === 'password') {
      const hasUppercase = /[A-Z]/.test(value);//uppercase test
      const hasLowercase = /[a-z]/.test(value);//lowercase test


      if (!hasUppercase) {
        error = 'Password must contain at least 1 uppercase character';
      }

      if (!hasLowercase) {
        error = 'Password must contain at least 1 lowercase character';
      }
      if (value.length < 8) {
        error = 'Password must be at least 8 characters long';
      }

    }

    if (name === 'email' && !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(value)) { //email test
      error = 'Please enter a valid email address';
    }
    if (name === 'password' && !isValid) {
      error = 'Password must contain at least 1 special character (e.g., @, #, $, &, >)';
    }

    if (name === 'name') {
      if (value === '') {
        error = 'Please enter the name!.'
      }
    }

    setErrors({ ...errors, [name]: error });

    if (name === 'password' && value.length >= 8) {
      const hasUppercase = /[A-Z]/.test(value);
      const hasLowercase = /[a-z]/.test(value);

      if (hasUppercase && hasLowercase) {
        setErrors({ ...errors, [name]: '' });
      }
    }

    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'email':
        setEmail(value);
        break;
      case 'password':
        setPassword(value);
        break;

      default:
        break;
    }
  };

  //submit func
  const handleSubmit = (e) => {
    e.preventDefault()
    if (Object.values(errors).some((error) => error !== '')) { //we can convert arr from obj
      alert('Please fix the form errors before submitting');
      return;
    }

    console.log({ name, email, password });
    if (signup) {
      dispatch(sign_up({ name, email, password }, nav))
    } else {
      dispatch(login({ email, password }, nav))
    }

    setLoading(true);

  }



  //redirect signin or siginup
  const handleClick = () => {
    setSignup(!signup);
    setEmail("");
    setName("");
    setPassword("");
    setErrors({});
  }
  return (


    <div class='auth'>


      <div className='container'>

        {signup ? <h2>Signup-Form</h2> : <h2>Login-Form</h2>}
        <form class="was-validated" onSubmit={(e) => handleSubmit(e)}>
          {
            signup && (
              <div class="was-validated">
                <label for="validationCustom01" class="form-label">Name</label>
                <input type='text' name='name' class="form-control is-invalid" id="validationCustom01" value={name} placeholder='Enter your name' onChange={handleInputChange} required />
                <div class="invalid-feedback">
                  {
                    errors.name ? <div className="error-message">{errors.name}</div>
                      :
                      <></>
                  }
                </div>
              </div>
            )
          }
          {!signup && (
            <div>
              <label for="validationCustom01" class="form-label">Email address</label>
              <input type='email' name='email' class="form-control is-invalid" for="validationCustom01" value={email} placeholder='Enter your email' onChange={handleInputChange} required />
              <div class="invalid-feedback">
                {
                  errors.email ? <div className="error-message">{errors.email}</div>
                    :
                    <></>
                }
              </div>


              <label for="validationCustom02" class="form-label">Password</label>
              <input type='password' name='password' class="form-control is-invalid" id="validationCustom02" value={password} placeholder='Enter your password' onChange={handleInputChange} required />
              <div class="invalid-feedback">
                {
                  errors.password ? <div className="error-message">{errors.password}</div>
                    :
                    <></>
                }
              </div>
            </div>

          )}


          {signup && (
            <>
              <label for="validationCustom01" class="form-label">Email</label>
              <input type='email' name='email' class="form-control is-invalid" for="validationCustom01" value={email} placeholder='Enter your email' onChange={handleInputChange} required />
              <div class="invalid-feedback">
                {
                  errors.email ? <div className="error-message">{errors.email}</div>
                    :
                    <></>
                }
              </div>


              <label for="validationCustom02" class="form-label">Password</label>
              <input type='password' name='password' class="form-control is-invalid" id="validationCustom02" value={password} placeholder='Enter your password' onChange={handleInputChange} required />
              <div class="invalid-feedback">
                {
                  errors.password ? <div className="error-message">{errors.password}</div>
                    :
                    <></>
                }
              </div>


            </>
          )}

          <button type='submit' disabled={loading}>{loading ? "Loading..." : signup ? "sign up" : "Log in"}</button>
          <div style={{ display: "flex" }}>
            {!signup &&
              <Link to='/forget'> <h4 style={{ fontSize: "13px", fontWeight: "400", color: "rgb(21, 158, 212)" }}>
                Forget Password?
              </h4>
              </Link>}
          </div>



        </form>
        <div style={{ padding: "10px 20px", margin: "10px 20px", textAlign: "center", fontSize: "13px" }}>
          {
            signup ? "Already have an account?" : "Don’t have an account?"
          }

          <button type='button' style={{ border: "none", color: "rgb(21, 158, 212)", fontSize: "13px", fontWeight: "400" }}
            onClick={() => handleClick()}>{signup ? "sign in" : "Sign up"}</button>
        </div>
      </div>
    </div>
  )
}
