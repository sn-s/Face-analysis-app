const initState = [];

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case "AUTH_CHECK":
      return{
        ...state,
        isUserSignedIn: action.payload
      }
    case "SIGNUP_SUCCESS":
      return{
        ...state,
        signedUpData: action.payload
      }
    case "SIGNUP_ERROR":
      return{
        ...state,
        signUpError: action.payload
      }
    case "SIGNIN_SUCCESS":
      return{
        ...state,
        signedIn: action.payload
      }
    case "SIGNIN_ERROR":
      return{
        ...state,
        signInError: action.payload
      }
    case "SIGNOUT_SUCCESS":
      return{
        ...state,
        signedOutData: "user has signed out"
      }
    default:
      return state;
  }
}

export default authReducer;