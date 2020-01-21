const initState = [];

const imageReducer = (state = initState, action) => {
  switch (action.type) {
    case "GET_IMAGES":
      return {
        ...state,
        thumbnails: action.payload
      }  
    default:
      return state;
  }
}

export default imageReducer;