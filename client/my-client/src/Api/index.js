import axios from 'axios'

//create Api
const API = axios.create({baseURL:"http://localhost:8000"})

API.interceptors.request.use((req) => {
    if (localStorage.getItem("profile")) {
      req.headers.authorization = `Bearer ${
        JSON.parse(localStorage.getItem("profile")).token
      }`;
    }
    return req;
  });

//login
export const logIn = (authdata) => API.post('/user/login',authdata)
//signup
export const signUp = (authdata) => API.post('/user/signup',authdata)
//forget-pw
export const forget = (email) => API.post('/user/forgetPw',email)

//Addexpense
export const addExpense = (expenseData) => API.post('/expense/addexpense',expenseData)
//getExpense
export const getExpense = (page) =>API.get(`/expense/getexpense?page=${page}`)
//updateexpense
export const updateExpense = (id,updateData) => API.put(`/expense/updateexpense/${id}`,updateData);
//deleteexpense
export const deleteExpense = (id) => API.delete(`/expense/deleteexpense/${id}`)

//Total(category)
export const getTotalcategory = (page) =>API.get(`/expense/getTotalcategory`);

