const currentuserReducer = (state =null, action) => {

    switch(action.type){
        case "FETCH-CURRENT-USER":
            return action.payload;
            default:
                return state;
    }
}

export default currentuserReducer;