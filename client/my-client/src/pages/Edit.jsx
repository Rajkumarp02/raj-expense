import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { updateExpense } from '../Action/expense';
import { Link, useNavigate, useParams } from 'react-router-dom';

export default function Edit() {
    const { id } = useParams()
    const data = useSelector((state) => state.addExpense);
    //const user = useSelector((state) => state.currentuserReducer);

    console.log(id);
    const [name, setName] = useState('');//edit name
    const [amount, setAmount] = useState('');//edit amount
    const [category, setCategory] = useState('');//edit category
    const nav = useNavigate()
    const dispatch = useDispatch();

    useEffect(() => {
        // Find the expense with the matching id
        const expense = data?.data?.docs.find((item) => item._id === id);
        if (expense) {
            setName(expense.name);
            setAmount(expense.amount);
            setCategory(expense.category);
        }
    }, [data, id]);
   //submit func
    const handleSubmit = (e) => {
        e.preventDefault()
        if (name, amount, category) {
            dispatch(updateExpense(id, { name, amount, category }, nav))
        }
        setName('');
        setAmount('');
        setCategory('');
    }


    return (
        <div className='auth'>
            <div className='container'>
                <h2 className='fw-bolder'>Update_Form</h2>
                <form className="was-validated" onSubmit={(e) => handleSubmit(e)}>
                    
                    <label for="validationCustomName" class="form-label">Name</label>
                    <input type='text' name='name' class="form-control" id="validationCustomName" value={name} placeholder='Enter your email' onChange={(e) => setName(e.target.value)} required />
                    <div class="invalid-feedback">
                        <p>Please Enter Name</p>
                    </div>

                    <label for="validationCustomAmount" class="form-label">Amount</label>
                    <input type='number' name='amount' class="form-control" id="validationCustomAmount" value={amount} placeholder='Enter your email' onChange={(e) => setAmount(e.target.value)} required />
                    <div class="invalid-feedback">
                        <p>Please Enter Amount</p>
                    </div>

                    <label for="validationCustomCategory" class="form-label">Category</label>
                    <input type='text' name='category' class="form-control" id="validationCustomCategory" value={category} placeholder='Enter your email' onChange={(e) => setCategory(e.target.value)} required />
                    <div class="invalid-feedback">
                        <p>Please Enter category</p>
                    </div>

                    <button type="submit" class="btn btn-primary">Save changes</button>
                    <br/>
                    <Link to='/viewexpense'>
                    <button type="button" class="btn btn-primary cancel">cancel</button>
                    </Link>
                </form>
            </div>
        </div>



    )
}
