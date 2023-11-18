import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addExpense } from '../Action/expense';

export default function AddExpense() {


  const [name, setName] = useState('');//description of category
  const [amount, setAmount] = useState('');//amount of category
  const [category, setCategory] = useState('');//category

  const dispatch = useDispatch()
  const nav = useNavigate()

  //submit func of addexpense
  const handleSubmit = (e) => {
    e.preventDefault()
    if (name && amount && category) {
      dispatch(addExpense({ name, amount, category }, nav))
    } else {
      alert("not dispatch anything...!")
    }
    setName("");
    setAmount('');
    setCategory('');
  }
  return (
    <>
      <div className='auth'>
        <div className='container-sm mb-3'>
          <h2 className='fw-bolder'>AddExpense_Form</h2>
          <form className="was-validated" onSubmit={(e) => handleSubmit(e)}>

            <label for="validationCustom01" class="form-label">Name</label>
            <input type='text' name='name' class="form-control" id="validationCustom01" value={name} placeholder='Enter expense description' onChange={(e) => setName(e.target.value)} required />
            <div class="invalid-feedback">
              <p>Please Enter Name</p>
            </div>

            <label for="validationCustom01" class="form-label">Amount</label>
            <input type='number' name='amount' class="form-control" id="validationCustom01" value={amount} placeholder='Enter expense amount' onChange={(e) => setAmount(e.target.value)} required />
            <div class="invalid-feedback">
              <p>Please Enter Amount</p>
            </div>

            <label for="validationCustom01" class="form-label">Category</label>
            <input type='text' name='category' class="form-control" id="validationCustom01" value={category} placeholder='Enter expense category' onChange={(e) => setCategory(e.target.value)} required />
            <div class="invalid-feedback">
              <p>Please Enter category</p>
            </div>
            <br/>
            <button className='btn btn-info' type='submit'>Submit</button>
          </form>
        </div>
      </div>
    </>
  )
}
