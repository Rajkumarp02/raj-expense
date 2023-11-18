import * as api from '../Api/index'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//addexpense-action
export const addExpense = (expenseData, nav) => async (dispatch) => {
  try {
    const { data } = await api.addExpense(expenseData);
    console.log(data)
    dispatch({ type: 'POST', payload: data })
    dispatch(getexpense())
    toast.success("Successfully addExpense..", {
      position: toast.POSITION.TOP_CENTER,
    })
    nav("/");
  } catch (err) {
    toast.error(err.response.data.status, {
      position: toast.POSITION.TOP_CENTER,
    })
  }
}


//getexpense Data
export const getexpense = (page) => async (dispatch) => {
  try {
    const { data } = await api.getExpense(page)
    dispatch({ type: 'FETCH-DATA', payload: data })
  } catch (err) {
    console.log(err)
  }
}

//delete-expense-action

export const deleteExpense = (id) => async (dispatch) => {
  console.log(id);
  try {
    const { data } = api.deleteExpense(id);
    dispatch({ type: "DELETE", payload: data })
    dispatch(getexpense())
    toast.warning('Successfull deleted', {
      position: toast.POSITION.TOP_CENTER,
    })
  } catch (err) {
    console.log(err)
  }
}


//update-Expense-action
export const updateExpense = (id, updateData, nav) => async (dispatch) => {
  try {
    const { data } = await api.updateExpense(id, updateData)
    dispatch({ type: "UPDATE", payload: data })
    toast.success("successfully Edit the data", {
      position: toast.POSITION.TOP_CENTER,
    })
    nav('/viewexpense')
  } catch (error) {
    console.log(error)
  }
}


//getTotal Category
export const getTotalcategory = () => async (dispatch) => {

  try {
    const { data } = await api.getTotalcategory();
    dispatch({ type: 'FETCH-TOTAL', payload: data })
  } catch (error) {
    console.log(error);
  }
}