const addExpense = (state = {data:null},action) =>
{
  switch(action.type){
    case "POST":
      return{...state};
     
      case "FETCH-DATA":
      return{...state ,data:action.payload};
       
      case "UPDATE" :
        if (state.data && Array.isArray(state.data)) {
        return{ 
          ...state,data: state.data.map(item =>
          item._id === action.payload._id ? action.payload : item
          )} 
        }

        case "DELETE":
          if (state.data && Array.isArray(state.data)) {
          return {
            ...state,data: state.data.filter((item) => item._id !== action.payload)
          }
         }
         default:
        return state;
  }
}

export default addExpense;
