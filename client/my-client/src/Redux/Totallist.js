const TotalList = (state = {data:null},action) => {
 switch(action.type){
    case "FETCH-TOTAL":
        return{...state,data:action.payload};
    default:
        return state;
 }
}

export default TotalList;