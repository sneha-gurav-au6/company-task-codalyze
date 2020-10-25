
const initial = {
    line:""

}


const reducer = (state = initial,action)=>{
const type = action.type
const payload= action.payload
switch (type) {
    case "LINE": {
      return {
        ...state,
        line: payload,
      };
    }
   
    default:
      return { ...state };
  }
}

export default reducer