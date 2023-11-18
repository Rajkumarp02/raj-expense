import { combineReducers } from "redux"
import reducer from "./reducer"
import currentuserReducer from "./currentuser.js"
import addExpense from "./expense.js"
import Totallist from "./Totallist.js"
export default combineReducers(
    {
       reducer,currentuserReducer,addExpense,Totallist
    }
)