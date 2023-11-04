import React, { useEffect, useState } from 'react';
import axios from 'axios'
import './Login.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { faChevronRight} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  useLoginMutation,
} from '../../api/authApi';
import { useDispatch } from 'react-redux';
import { setUser } from '../../slices/authSlice';
import InputField from '../../components/inputField/inputField';
import LoaderSpiner from '../../components/Loader/LoaderSpiner';
import useForm from '../../hooks/useForm';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from '../../firebase.config';
const Login = () => {

  const [loginUser, { isLoading, isError, error }] = useLoginMutation();
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation()
  const provider = new GoogleAuthProvider();
  const auth = getAuth(app);
 const from = location.state?.from?.pathname || '/';
 

const handleGoogleLogin = ()=>{

   signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
  
    const loginUser = result.user;
    const savedUser = {name : loginUser.displayName, email: loginUser.email, picture: loginUser?.photoURL}
    axios.post('https://fierce-pear-pelican.cyclic.app/api/auth/googlesignin', savedUser)
    .then((response)=>{
     const data = response.data
     localStorage.setItem('access_token', data.access_token);
        dispatch(setUser({...data.user, access_token: data.access_token}))
        console.log('Login Successful!', data);
  
        navigate(from, {replace: true});
    })
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });
}


  const initialState = {
    identifier: '',
    password: '',
  }
  const validateForm = (values)=>{
    const errors = {}
    if(!values.identifier){
      errors.identifier = 'Username or Email is required'
    }
  
    if(!values.password){
      errors.password = 'Password is required'
    }
  
    return errors;
  }
  
    const {formState, handleBlur, handleChange, handleFocus, handleSubmit} = useForm({
      init: initialState,
      validate: validateForm
    })
  
 


  const handleLoginSubmit = async ({hasError, errors, values}) => {
    try {
      if(!hasError){
        const { data } = await loginUser({
          identifier: values.identifier,
          password: values.password,
        });
        localStorage.setItem('access_token', data.access_token);
        dispatch(setUser({...data.user, access_token: data.access_token}))
        console.log('Login Successful!', data);
  
        navigate(from, {replace: true});
      } 
    } catch (error) {
      console.log(error);
    }
  };
  

  // const handleGoogleLogin = () => {
  //   window.open( 'https://fierce-pear-pelican.cyclic.app/api/auth/google', '_self');

  // };




  const handleFacebookLogin = () => {
    window.open = 'https://fierce-pear-pelican.cyclic.app/api/auth/facebook', '_self';
  };

  
  return (
    <div className="login-container">
      <div className="login-content">
        <h2 className="text-xl font-semibold py-5">
          Ready for use MediaBook?
        </h2>
        <form onSubmit={(e)=> handleSubmit(e, handleLoginSubmit)}>
          <div className="custom-login-input-container">
            
              <InputField
            label="Email or Username"
            type="text"
            name="identifier"
            placeholder="Enter Your Email or Username"
            value={formState.identifier.value}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            error={formState.identifier.error}
            required
          />
          </div>

          <div className="custom-login-input-container">
          <InputField
            label="Password"
            type="password"
            name="password"
            placeholder="Enter Your Password"
            value={formState.password.value}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            error={formState.password.error}
            required
          />
          </div>

          {
            isLoading ? <LoaderSpiner/> : null
          }
          {isError && (
            <span className="text-red-600 ">{error.data.message}</span>
          )}
          <div className="signup-button-container">
            <button className="signup-button" type="submit">
              Login
            </button>
          </div>
        </form>
        {/* {isError && <span>{error}</span>} */}
        <div
          className=" w-full google-login "
          onClick={handleGoogleLogin}
        >
          <img
            className="w-6 mr-4"
            src="https://i.ibb.co/qjPpT1m/images.png"
            alt=""
          />
          <button>Login with Google</button>
        </div>
        {/* <div
          className="mt-4 w-full facebook-login "
          onClick={handleFacebookLogin}
        >
          <img
            className="w-6 mr-4"
            src="https://i.ibb.co/VQwXnCd/download.jpg"
            alt=""
          />
          <button>Login with Facebook</button>
        </div> */}
        <div className="login-or">
          <p>OR</p>
        </div>
        <Link to="/register" className="mt-4 w-full facebook-login ">
          <button>Sign Up </button>
          <FontAwesomeIcon
            className="w-6 ml-3"
            icon={faChevronRight}
            beatFade
          />
        </Link>
      </div>
    </div>
  );
};

export default Login;
