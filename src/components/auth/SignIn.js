import React, { useState } from 'react'
import { Redirect } from "react-router-dom";

import { connect } from "react-redux";
import { signIn } from "../../redux/actions/authActions";

const SignIn = ({ signIn, isUserSignedIn, signInError }) => {
  const [state, setState] = useState({
    email: "",
    password: "",
  })
  
  const onInputChange = (e) => {
    const {name, value} = e.target;
    setState(prevState => ({
      ...prevState,
      [name]: value
      })
    )
  }

  const onFormSubmit = (e) => {
    e.preventDefault()
    const cred = state
    signIn(cred)
  }

  if(isUserSignedIn) return <Redirect to="/" />

  return (
    <div>
      <p className="f4 f3-ns mv5 ma3 ma5-ns">
        WHO-AM-I is powered by Clarifai, which uses a Visual Recognition AI to analyse images 
        and return data based on facial characteristics. Clarifai uses machine learning to train 
        models to recognise certain patterns in the images.
      </p> 
      <article className="w-100-ns w-75-m w-90 br3 ba b--white-50 mv4 w-50-l mw6 shadow-5 center">  
        <main className="pa4 white-80">
          <form className="measure" onSubmit={onFormSubmit} >
            <fieldset id="sign_in" className="ba b--transparent ph0 mh0">
              <legend className="f1 fw6 ph0 mh0 w-100">Sign In</legend>
              <div className="mt3">
                <label className="f4 db fw6 lh-copy" htmlFor="email-address">Email</label>
                <input 
                  className="pa2 input-reset ba bg-white hover-bg-black hover-white w-100" 
                  type="email" 
                  name="email"  
                  id="email"
                  onChange={onInputChange}/>
              </div>
              <div className="mv3">
                <label className="f4 db fw6 lh-copy" htmlFor="password">Password</label>
                <input 
                  className="b pa2 input-reset ba bg-white hover-bg-black hover-white w-100" 
                  type="password" 
                  name="password"  
                  id="password"
                  onChange={onInputChange}/>
              </div>
            </fieldset>
            <p className="f5" >{signInError && signInError.message}</p>
            <div className="">
              <input 
                className="b f4 ph3 pv2 white input-reset ba b--white bg-transparent grow pointer dib" 
                type="submit" 
                value="Sign in"/>
            </div>
            <div className="lh-copy mt3">
              <a href="/signup" className="f4 link dim white db pointer">Register</a>
            </div>
          </form>
        </main>
      </article>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    isUserSignedIn: state.auth.isUserSignedIn,
    signInError: state.auth.signInError
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    signIn: (cred) => dispatch(signIn(cred))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
