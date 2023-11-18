import express from 'express'
import { TotalList, addExpense, deleteExpense, getExpense, updateExpense } from '../controller/expense.js';
//import auth from '../Middleware/auth.js'
const router = express.Router();

router.post('/addexpense',addExpense)//post-expense
router.get('/getexpense',getExpense)//get-expense

router.put('/updateexpense/:id',updateExpense)//update-expense
router.delete('/deleteexpense/:id',deleteExpense)//delete-expense

router.get('/getTotalcategory',TotalList)//getTotal-category

export default router;